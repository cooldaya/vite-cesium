export default {
  viewer: {
    el: "cesium-container",
    config: {
      geocoder: false, //搜索框
      homeButton: false, //home按钮
      sceneModePicker: false, //3d/2d 模式切换按钮
      baseLayerPicker: false, //图层选择按钮
      navigationHelpButton: false, //右上角的帮助按钮
      animation: false, //左下角的动画控件的显示
      shouldAnimate: false, //控制模型动画
      timeline: false, //底部的时间轴
      fullscreenButton: false, //右下角的全屏按钮
      selectionIndicator: true, //选择指示器
      infoBox: true, //信息面板
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTJmN2I4MS1lM2Y5LTRmYzAtYjNkZS04OTM3YjU1ZDkzNzUiLCJpZCI6MTg5MTM5LCJpYXQiOjE3NDI4OTM2ODF9.79h4hMcmvkauq8EJtjrzOQotwEzer_b85rq8V3dIHy8'
    },
  },
};
