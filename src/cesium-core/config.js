import * as Cesium from "cesium";

export default {
  viewer: {
    el: "cesium-container",
    config: {
      // geocoder: false, //搜索框
      homeButton: true, //home按钮
      sceneModePicker: false, //3d/2d 模式切换按钮
      baseLayerPicker: false, //图层选择按钮
      navigationHelpButton: false, //右上角的帮助按钮
      animation: true, //左下角的动画控件的显示
      shouldAnimate: true, //控制模型动画
      timeline: true, //底部的时间轴
      fullscreenButton: false, //右下角的全屏按钮
      selectionIndicator: true, //选择指示器
      infoBox: true, //信息面板
      baseLayer: false,
      geocoder: Cesium.IonGeocodeProviderType.GOOGLE,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTJmN2I4MS1lM2Y5LTRmYzAtYjNkZS04OTM3YjU1ZDkzNzUiLCJpZCI6MTg5MTM5LCJpYXQiOjE3NDI4OTM2ODF9.79h4hMcmvkauq8EJtjrzOQotwEzer_b85rq8V3dIHy8",
    },
  },
  scene: {
    debugShowFramesPerSecond: true,
  },
  camera: {
    initView: {
      destination: [108.13882452989903, 29.283045469057786, 27057.042923491954],
      orientation: {
        heading: 9.36925585432931,
        pitch: -85.02111947342317,
        roll: 0.04092951801137542,
      },
    },
    homeView: {
      destination: [108.13882452989903, 29.283045469057786, 27057.042923491954],
      orientation: {
        heading: 9.36925585432931,
        pitch: -85.02111947342317,
        roll: 0.04092951801137542,
      },
    },
  },
  basemaps: [
    {
      name: "高德",
      type: "amap",
      options:{
        // style:'vec'
      }
    },

  ],
};
