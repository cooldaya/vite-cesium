import * as Cesium from "cesium";
import cesiumConfig from "./config";
import "./mousetrap";

export class CesiumCore {
  cesiumConfig = cesiumConfig;
  viewer = null;
  camera = null;
  constructor() {
    this.init();
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
      this.cesiumConfig.viewer.config
    ));
    viewer.cesiumWidget.creditContainer.style.display = "none"; //隐藏logo版权

    // 初始化 camera视角
    {
      const camera = (this.camera = viewer.camera);
      const { initView: initViewConfig, homeView: homeViewConfig } =
        cesiumConfig.camera;

      const formatViewByConfig = (config) => {
        if (!config || !config.destination || !config.orientation) return;
        return {
          destination: Cesium.Cartesian3.fromDegrees(...config.destination),
          orientation: Object.entries(config.orientation).reduce(
            (acc, [key, value]) => (
              (acc[key] = Cesium.Math.toRadians(value)), acc
            ),
            {}
          ),
        };
      };

      const initView = formatViewByConfig(initViewConfig);
      console.log(initView);
      // 初始化视角
      camera.setView(initView);

      // home视角
      viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        (event) => {
          event.cancel = true; // 取消默认的 home 视角
          viewer.camera.flyTo({
            ...(formatViewByConfig(homeViewConfig) ?? initView),
            duration: 2, // 飞行动画时间 2s
          });
        }
      );
    }
  }

  test() {
    // Remove default base layer
    const viewer = this.viewer;
    viewer.scene.globe.enableLighting = true;
  }
  getCameraPositionAndOrientation() {
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

    const view = {
      destination: [longitude, latitude, height],
      orientation: {
        heading: heading,
        pitch: pitch,
        roll: roll,
      },
    };
    return view;
  }
}

const cesiumCore = (window.cesiumCore = new CesiumCore());

export default cesiumCore;
