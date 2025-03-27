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
    this.viewer = new Cesium.Viewer(container, this.cesiumConfig.viewer.config);
    this.viewer.cesiumWidget.creditContainer.style.display = "none"; //隐藏logo版权

    // 初始化 camera视角
    {
      const camera = (this.camera = this.viewer.camera);
      const initViewConfig = cesiumConfig.camera.initView;
      // 初始化视角
      camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          ...initViewConfig.destination
        ),
        orientation: Object.entries(initViewConfig.orientation).reduce(
          (acc, [key, value]) => (
            (acc[key] = Cesium.Math.toRadians(value)), acc
          ),
          {}
        ),
      });
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
