import fs from "fs";
import path from "path";

function TileIndexPlugin(
  pluginOptions = {
    tilesDir: "",
    rootDir: "",
    tileFilterName: "",
  },
) {
  return {
    name: "tile-index",
    config(config) {
      checkPluginOptions(pluginOptions);
      const indexMaps = getTileIndexs(pluginOptions);
      const varName = "TileIndexPlugin-" + pluginOptions.tileFilterName;
      config.define = {
        ...(config.define || {}),
        [varName]: indexMaps,
      };
    },
  };
}

function getTileIndexs(pluginOptions) {
  const tilesDir = path.resolve(pluginOptions.rootDir, pluginOptions.tilesDir); // 假设放在 public/tiles
  const imagePathMap = {};
  function walk(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      const imgExg = /\.(png|jpg|jpeg)$/i;
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (imgExg.test(file)) {
        const relPath = path
          .relative(tilesDir, fullPath)
          .replace(/\\/g, "/")
          .replace(imgExg, "");
        imagePathMap[relPath] = true;
      }
    });
  }

  walk(tilesDir);
  return imagePathMap;
}

function checkPluginOptions(pluginOptions) {
  for (const key in pluginOptions) {
    if (!pluginOptions[key]) {
      throw new Error(`TileIndexPlugin:---> options.${key} is required`);
    }
  }
}

export default TileIndexPlugin;
