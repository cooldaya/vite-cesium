import * as Cesium from "cesium";
import * as turf from "@turf/turf";
import cesiumConfig from "./config";
import { bindModules } from "./modules";
import { bindUtils } from "./utils";
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

    //   const provider = new Cesium.UrlTemplateImageryProvider({
    //   url: "http://127.0.0.1:9982/tile1/{z}/{x}/{y}.png", // 替换为你的路径
    //   maximumLevel: 18,  // 与你切片导出时一致
    //   credit: "Local XYZ Tiles",
    //   rectangle: Cesium.Rectangle.fromDegrees(106.435523000, 29.126545000, 107.002209000, 29.769966000)
    // })

    // viewer.imageryLayers.addImageryProvider(provider)

    // viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#264130');

    // return;
    //  modifyMap(viewer, {
    //     //反色?
    //     invertColor: true,
    //     //滤镜值
    //     filterRGB: [69, 112, 164],
    // });
    function modifyMap(viewer, options) {
      const baseLayer = viewer.imageryLayers.get(0);
      //以下几个参数根据实际情况修改,目前我是参照火星科技的参数,个人感觉效果还不错
      baseLayer.brightness = options.brightness || 0.6;
      baseLayer.contrast = options.contrast || 1.8;
      baseLayer.gamma = options.gamma || 0.3;
      baseLayer.hue = options.hue || 1;
      baseLayer.saturation = options.saturation || 0;
      const baseFragShader =
        viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;
      for (let i = 0; i < baseFragShader.length; i++) {
        const strS =
          "color = czm_saturation(color, textureSaturation);\n#endif\n";
        let strT =
          "color = czm_saturation(color, textureSaturation);\n#endif\n";
        if (options.invertColor) {
          strT += `
      color.r = 1.0 - color.r;
      color.g = 1.0 - color.g;
      color.b = 1.0 - color.b;
      `;
        }
        if (options.filterRGB.length > 0) {
          strT += `
      color.r = color.r * ${options.filterRGB[0]}.0/255.0;
      color.g = color.g * ${options.filterRGB[1]}.0/255.0;
      color.b = color.b * ${options.filterRGB[2]}.0/255.0;
      `;
        }
        baseFragShader[i] = baseFragShader[i].replace(strS, strT);
      }
    }



     async function tta() {
        // Common setting for the skipLevelOfDetail optimization
        const tileset = await Cesium.Cesium3DTileset.fromUrl(
          "http://localhost:9004/tile/model/service/tcrGYRnP/tileset.json?labtoken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiItMSxUaHUgQXByIDE4IDE1OjMwOjU3IENTVCAyMDI0In0.j_YKsCRsIQtpgOWfFvMwAP65Rlx9uXyVte_xkE95Vdo",
          {
            skipLevelOfDetail: true,
            baseScreenSpaceError: 1024,
            skipScreenSpaceErrorFactor: 16,
            skipLevels: 1,
            immediatelyLoadDesiredLevelOfDetail: false,
            loadSiblings: false,
            cullWithChildrenBounds: true,
          }
        );

        viewer.scene.primitives.add(tileset);
        viewer.zoomTo(tileset);
        console.log({
          tileset
        })
      }
      tta();

    //调用
    // import modifyMap from './filterColor'
    // modifyMap(viewer, {
    //     //反色?
    //     invertColor: true,
    //     //滤镜值
    //     filterRGB: [60, 145, 172],
    // });
    // viewer是什么不用我说了吧
  }
}

const cesiumCore = (window.cesiumCore = new CesiumCore(cesiumConfig));

export default cesiumCore;
