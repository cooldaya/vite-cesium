import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
import UnoCSS from "unocss/vite";
import TileIndexPlugin from "./cus/cus-vite-plugins/TileIndexPlugin.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    cesium(),
    vue(),
    UnoCSS(),
    TileIndexPlugin({
      tilesDir: "./public/cesium/map1",
      rootDir: __dirname,
      tileFilterName: "filterMap1",
    }),
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
