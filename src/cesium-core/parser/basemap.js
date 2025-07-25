import * as Cesium from "cesium";
import * as chinaMapProviders from "../libs/china-map";

// 国内地图
const chinaMapClassDict = {
  amap: "AMapImageryProvider",
  baidu: "BaiduImageryProvider",
  tencent: "TencentImageryProvider",
  geovis: "GeoVisImageryProvider",
  google: "GoogleImageryProvider",
  tdt: "TdtImageryProvider",
};
// custom 常用底图
const customMapClassDict = {
  osm: (options = {}) => {
    // 加载OSM在线地图（标准风格）
    const osmProvider = new Cesium.UrlTemplateImageryProvider({
      ...options,
      url:
        options.url || "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      subdomains: options.subdomains || ["a", "b", "c", "d"],
    });
    return osmProvider;
  },
};

// 获取地图的构造函数
const getProviderFuncMap = {
  getChinaMapProvider(type, options = {}) {
    // 处理国内的几个特殊地图
    if (type in chinaMapClassDict) {
      const providerClass = chinaMapProviders[chinaMapClassDict[type]];
      if (!providerClass) {
        console.error("国内地图不存在");
        return null;
      }
      const provider = new providerClass({
        ...options,
        style: options.style || "img",
        crs: options.crs || "WGS84",
      });
      return provider;
    }
  },
  getCustomMapProvider(type, options) {
    // 自定义常用底图
    if (type in customMapClassDict) {
      const provider = customMapClassDict[type](options);
      return provider;
    }
    return null;
  },
  getCesiumProvider(type, options) {
    // 处理国内的几个特殊地图
    if (type in Cesium) {
      const providerClass = chinaMapProviders[chinaMapClassDict[type]];
      if (!providerClass) {
        console.error("国内地图不存在");
        return null;
      }
      const provider = new providerClass(options);
      return provider;
    }
  },
};

class BaseMapManager {
  viewer = null;
  mapDict = new Map();

  constructor(viewer) {
    this.viewer = viewer;
  }

  getMapLayerProvider(type, options = {}) {
    for (const getProviderFunc of Object.values(getProviderFuncMap)) {
      const provider = getProviderFunc(type, options);
      if (provider) return provider;
    }
    return null;
  }

  registerMapByMapInfo(baseMapItemInfo) {
    const { mapDict, viewer } = this;
    const { name, type, options = {}, show = true } = baseMapItemInfo;
    if (typeof name !== "string") return console.error("地图名称必须是字符串");
    if (mapDict.has(name)) return console.error("地图名称重复");

    let layer = null;
    const provider = this.getMapLayerProvider(type, options);
    if (!provider) {
      return console.error("地图配置有误不存在");
    }
    layer = new Cesium.ImageryLayer(provider);
    layer.show = show;

    // 存入MapDict中
    const mapDictItem = {
      config: baseMapItemInfo,
      layer,
    };
    mapDict.set(name, mapDictItem);
    viewer.imageryLayers.add(layer);
  }

  get showMaps() {
    return Array.from(this.mapDict.values()).filter((item) => item.layer.show);
  }

  set showMaps(names) {
    if (!Array.isArray(names)) return;
    const mapDictNames = Array.from(this.mapDict.keys());

    let isValid = true;

    names.forEach((name) => {
      if (!mapDictNames.includes(name)) {
        console.error(`地图${name}不存在`);
        isValid = false;
      }
    });

    if (!isValid) return;

    for (const [name, mapDictItem] of this.mapDict) {
      mapDictItem.layer.show = names.includes(name);
    }
  }
}

export function parseBaseMap(viewer, cesiumConfig) {
  const baseMapManager = new BaseMapManager(viewer);

  const { basemaps: basemapsConfig } = cesiumConfig;

  if (!Array.isArray(basemapsConfig)) {
    return;
  }
  basemapsConfig.forEach((baseMapItemInfo) =>
    baseMapManager.registerMapByMapInfo(baseMapItemInfo),
  );

  return baseMapManager;
}
