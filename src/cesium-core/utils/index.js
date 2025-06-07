import * as camera from "./camera/index.js";

export const utils = {
  camera,
};
export function bindUtils(cesiumCore) {
  cesiumCore.utils = utils;
}
