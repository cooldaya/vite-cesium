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
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkM2Y2ZjI2NC05MDJiLTQyZGEtYmFkMi1lOThlY2RmNzhmY2EiLCJpZCI6MTg5MTM5LCJpYXQiOjE3NDI4OTM3MDB9.yGBTtumntTGwICDGeAUetBM6yaGBCvaywZMTJwCxkJ4'
    },
  },
};
