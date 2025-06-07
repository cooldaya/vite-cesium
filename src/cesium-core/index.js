import * as Cesium from "cesium";
import * as turf from "@turf/turf";
import cesiumConfig from "./config";
import { bindModules } from "./modules";
import "./mousetrap";

export class CesiumCore {
  cesiumConfig = cesiumConfig;
  viewer = null;
  camera = null;

  constructor() {
    this.init();
    bindModules(this.viewer); // 绑定模块
    this.test();
  }

  init() {
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
    });
    document.body.appendChild(container);
    Cesium.Ion.defaultAccessToken = this.cesiumConfig.viewer.config.token;
    const viewer = (this.viewer = new Cesium.Viewer(
      container,
      this.cesiumConfig.viewer.config,
    ));
    viewer.cesiumWidget.creditContainer.style.display = "none"; //隐藏logo版权

    // 初始化 camera视角
    {
      const camera = (this.camera = viewer.camera);
      // 获取 初始视角及home视角配置
      const { initView: initViewConfig, homeView: homeViewConfig } =
        cesiumConfig.camera;

      // 格式化视角配置
      const formatViewByConfig = (config) => {
        if (!config || !config.destination || !config.orientation) return;
        return {
          destination: Cesium.Cartesian3.fromDegrees(...config.destination),
          orientation: Object.entries(config.orientation).reduce(
            (acc, [key, value]) => {
              acc[key] = Cesium.Math.toRadians(value);
              return acc;
            },
            {},
          ),
        };
      };
      const initView = formatViewByConfig(initViewConfig);
      camera.setView(initView);

      // 设置 home 视角
      viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        (event) => {
          event.cancel = true; // 取消默认的 home 视角
          viewer.camera.flyTo({
            ...(formatViewByConfig(homeViewConfig) ?? initView),
            duration: 2, // 飞行动画时间 2s
          });
        },
      );
    }
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
    });
    viewer.entities.add(entity);

    viewer.zoomTo(entity);

    viewer.selectedEntityChanged.addEventListener(function (selectedEntity) {
      if (Cesium.defined(selectedEntity)) {
        console.log("选中实体信息：", selectedEntity.name);
      }
    });
  }

  // 获取当前 camera 的视角
  getCameraPositionAndOrientation() {
    // 获取当前视图的摄像头对象
    const camera = this.viewer.camera;

    // 获取摄像头位置（经纬度和高度）
    const cartographic = Cesium.Cartographic.fromCartesian(camera.position);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const height = cartographic.height;

    // 直接使用 camera.heading, camera.pitch, camera.roll 获取朝向角度
    const heading = Cesium.Math.toDegrees(camera.heading); // 方向角
    const pitch = Cesium.Math.toDegrees(camera.pitch); // 俯仰角
    const roll = Cesium.Math.toDegrees(camera.roll); // 翻滚角

    return {
      destination: [longitude, latitude, height],
      orientation: {
        heading: heading,
        pitch: pitch,
        roll: roll,
      },
    };
  }
}

const cesiumCore = (window.cesiumCore = new CesiumCore());

export default cesiumCore;
