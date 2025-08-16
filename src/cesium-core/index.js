import * as Cesium from "cesium";
import * as turf from "@turf/turf";
import cesiumConfig from "./config";
import { bindModules } from "./modules";
import { bindUtils } from "./utils";
import { bindExts } from "./exts";
import { parseCesiumConfig } from "./parser";
import { useHtmlOverlay, addPopup } from "./libs/html-overlay";
import "./mousetrap";

window.Cesium = Cesium;

export class CesiumCore {
  cesiumConfig = null;
  viewer = null;
  camera = null;

  constructor(cesiumConfig) {
    this.cesiumConfig = cesiumConfig;
    this.init();
    bindUtils(this); // 绑定工具函数
    bindModules(this.viewer); // 绑定模块
    bindExts(this); // 绑定扩展类
    useHtmlOverlay(this.viewer);
    this.test();
  }

  init() {
    const { viewer } = parseCesiumConfig(this, this.cesiumConfig); // 解析 cesium 配置
    this.viewer = viewer;
    this.camera = viewer.camera;
  }
  // 给ENTITY添加鼠标事件

  async test() {
    const viewer = this.viewer;
  }
}

const cesiumCore = (window.cesiumCore = new CesiumCore(cesiumConfig));

export default cesiumCore;
