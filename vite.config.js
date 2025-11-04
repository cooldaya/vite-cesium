import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
import UnoCSS from "unocss/vite";
import TileIndexPlugin from "./cus/cus-vite-plugins/TileIndexPlugin.js";
import cesiumCoreConfig from "./src/cesium-core/config.js";

const tileIndexPlugins = cesiumCoreConfig.basemaps
  .filter((item) => item.type === "turl" && item.isUseTileIndexPlugin)
  .map((item) => {
    const tilesDir =
      "./public" + item.options.url.replace(/\/{z}\/{x}\/{y}\.(jpg|png)$/, "");
    console.log("tilesDir", tilesDir);
    return TileIndexPlugin({
      tilesDir: tilesDir,
      rootDir: __dirname,
      tileFilterName: item.options.tileFilterName,
    });
  });

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    cesium(),
    vue(),
    UnoCSS(),
    ...tileIndexPlugins,
  ],
  server: {
    port: 9982,
    host: "0.0.0.0",
    proxy: {
      "/geoserver": {
        target: "http://localhost:8080", // 代理目标地址
        changeOrigin: true, // 是否改变源
      },
    },
  },
});
