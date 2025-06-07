import * as Cesium from "cesium";

export function parseCamera(viewer, cesiumConfig) {
  // 初始化 camera视角
  {
    const camera = viewer.camera;
    // 获取 初始视角及home视角配置
    const { initView: initViewConfig, homeView: homeViewConfig } =
      cesiumConfig.camera;

    // 格式化视角配置
    const formatViewByConfig = (config) => {
      if (!config || !config.destination || !config.orientation) return;
      return {
        destination: Cesium.Cartesian3.fromDegrees(...config.destination),
        orientation: Object.entries(config.orientation).reduce(
          (acc, [key, value]) => {
            acc[key] = Cesium.Math.toRadians(value);
            return acc;
          },
          {},
        ),
      };
    };
    const initView = formatViewByConfig(initViewConfig);
    camera.setView(initView);

    // 设置 home 视角
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      (event) => {
        event.cancel = true; // 取消默认的 home 视角
        viewer.camera.flyTo({
          ...(formatViewByConfig(homeViewConfig) ?? initView),
          duration: 2, // 飞行动画时间 2s
        });
      },
    );
  }

  return {
    camera: viewer.camera,
  };
}
