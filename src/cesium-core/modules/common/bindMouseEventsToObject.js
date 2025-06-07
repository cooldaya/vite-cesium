import * as Cesium from "cesium";

// 给entity添加鼠标事件
// 自定义事件 -> 实体方法名 映射
const eventMap = {
  ON_CLICK: "onClick",
  ON_Double_Click: "onDoubleClick",
  ON_MOUSE_ENTER: "onMouseEnter",
  ON_MOUSE_LEAVE: "onMouseLeave",
  ON_MOUSE_MOVE: "onMouseMove",
};

export function bindMouseEventsToObject(viewer) {
  // 鼠标点击事件
  viewer.screenSpaceEventHandler.setInputAction((movement) => {
    console.log("Mouse clicked at position:", movement);
    // const pickedObject = viewer.scene.pick(movement.position);
    // if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
    //   console.log("Clicked on entity:", entity.name);
    //   // 在这里可以添加更多的交互逻辑
    // }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // 鼠标悬停事件
  // viewer.screenSpaceEventHandler.setInputAction((movement) => {
  //   const pickedObject = viewer.scene.pick(movement.endPosition);
  //   if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
  //     console.log("Hovered over entity:", entity.name);
  //     // 在这里可以添加更多的交互逻辑
  //   }
  // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
