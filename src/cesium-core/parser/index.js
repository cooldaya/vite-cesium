import { parseViewer } from "./viewer";
import { parseCamera } from "./camera";
import { parseBaseMap } from "./basemap";

export function parseCesiumConfig(cesiumCore, cesiumConfig) {
  const viewer = parseViewer(cesiumConfig);
  parseCamera(viewer, cesiumConfig);
  cesiumCore.baseMapManager = parseBaseMap(viewer, cesiumConfig);

  return {
    viewer,
  };
}
