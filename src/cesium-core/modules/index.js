import * as common from "./common/index.js";
import * as entity from "./entity/index.js";

export const modules = {
  common,
  entity,
};
export function bindModules(viewer) {
  Object.values(modules).forEach((module) => {
    Object.values(module).forEach((fn) => {
      if (typeof fn === "function") {
        fn(viewer);
      }
    });
  });
}
