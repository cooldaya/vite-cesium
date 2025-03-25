import { Viewer, Ion } from "cesium";
import cesiumConfig from "./config";

export class CesiumCore {
  cesiumConfig = cesiumConfig;
  viewer = null;
  constructor() {
    this.init();
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
    Ion.defaultAccessToken = this.cesiumConfig.viewer.config.token;
    this.viewer = new Viewer(container, this.cesiumConfig.viewer.config);
    this.viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏logo版权
  }
}

const core = new CesiumCore();
