import * as Cesium from "cesium";

export function parseViewer(cesiumConfig) {
  const { viewer: viewerConfig } = cesiumConfig;
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
  Cesium.Ion.defaultAccessToken = viewerConfig.config.token;
  const viewer = new Cesium.Viewer(container, viewerConfig.config);
  viewer.cesiumWidget.creditContainer.style.display = "none"; //隐藏logo版权
  return viewer;
}
