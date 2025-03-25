import * as Cesium from "cesium";
import cesiumConfig from "./config";

export class CesiumCore {
  cesiumConfig = cesiumConfig;
  viewer = null;
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
    this.viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏logo版权
  }

  test() {
    // Remove default base layer
    const viewer = this.viewer;
    // Remove default base layer
    viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

    const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(
      Cesium.IonImageryProvider.fromAssetId(3954)
    );
    viewer.imageryLayers.add(imageryLayer);

    viewer.scene.setTerrain(
      new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))
    );
  }
}

const core = new CesiumCore();
