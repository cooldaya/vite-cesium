import { parseViewer } from "./viewer";
import { parseCamera } from "./camera";

export function parseCesiumConfig(cesiumCore, cesiumConfig) {
  const viewer = parseViewer(cesiumConfig);
  parseCamera(viewer, cesiumConfig);

  return {
    viewer,
  };
}
