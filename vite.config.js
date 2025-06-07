import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
import UnoCSS from "unocss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [cesium(), vue(), UnoCSS()],
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
