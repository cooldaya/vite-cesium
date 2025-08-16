import * as ImageryProvider from "./ImageryProvider/index.js";

export const exts = {
  ImageryProvider,
};
export function bindExts(cesiumCore) {
  cesiumCore.exts = exts;
}
