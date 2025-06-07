import * as Cesium from "cesium";
import * as turf from "@turf/turf";
import cesiumConfig from "./config";
import { bindModules } from "./modules";
import { bindUtils } from "./utils";
import { parseCesiumConfig } from "./parser";
import "./mousetrap";

export class CesiumCore {
  cesiumConfig = null;
  viewer = null;
  camera = null;

  constructor(cesiumConfig) {
    this.cesiumConfig = cesiumConfig;
    this.init();
    bindUtils(this); // 绑定工具函数
    bindModules(this.viewer); // 绑定模块
    this.test();
  }

  init() {
    const { viewer } = parseCesiumConfig(this, this.cesiumConfig); // 解析 cesium 配置
    this.viewer = viewer;
    this.camera = viewer.camera;
  }
  // 给ENTITY添加鼠标事件

  test() {
    // Remove default base layer
    const viewer = this.viewer;
    // (async () => {
    //   try {
    //     const tileset = await Cesium.Cesium3DTileset.fromUrl(
    //       "/cesium/tilesets/cq/tileset.json",
    //     );
    //     viewer.scene.primitives.add(tileset);
    //     viewer.zoomTo(tileset);
    //   } catch (error) {
    //     console.error(`Error creating tileset: ${error}`);
    //   }
    // })();

    // 创建一个点 GeoJSON
    const point = turf.point([116.3913, 39.9075]); // 北京坐标

    // 创建缓冲区半径为 5 公里
    const buffered = turf.buffer(point, 5, { units: "kilometers" });

    // 将 turf.js 创建的 polygon geojson 转换为 Cesium Polygon
    const coordinates = buffered.geometry.coordinates[0]; // 外环坐标
    const hierarchy = coordinates.map((coord) =>
      Cesium.Cartesian3.fromDegrees(coord[0], coord[1]),
    );

    const entity = new Cesium.Entity({
      name: "Buffered Area",
      polygon: {
        hierarchy: hierarchy,
        material: Cesium.Color.RED.withAlpha(0.5),
        height: 0,
      },
      onClick: function () {
        console.log("Polygon clicked!");
      },
      onMouseEnter: function () {
        console.log("Mouse entered polygon!");
      },
      onMouseLeave: function () {
        console.log("Mouse left polygon!");
      },
    });
    viewer.entities.add(entity);

    viewer.zoomTo(entity);
  }
}

const cesiumCore = (window.cesiumCore = new CesiumCore(cesiumConfig));

export default cesiumCore;
