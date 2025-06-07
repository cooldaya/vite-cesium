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

/**
 * Binds mouse events (click, double-click, hover) to objects in a Cesium viewer.
 *
 * @param {Cesium.Viewer} viewer - The Cesium viewer instance to bind events to.
 *
 * @function executeObjectMethod
 * Executes a specified method on a given object with an optional payload.
 *
 * @param {Object} object - The object on which the method will be executed.
 * @param {string} methodName - The name of the method to execute.
 * @param {*} [payload] - Optional payload to pass to the method.
 *
 * Mouse Events:
 * - LEFT_CLICK: Triggers the `ON_CLICK` method on the picked object.
 * - LEFT_DOUBLE_CLICK: Triggers the `ON_Double_Click` method on the picked object.
 * - MOUSE_MOVE: Handles hover events:
 *   - Triggers `ON_MOUSE_ENTER` when the mouse enters a new object.
 *   - Triggers `ON_MOUSE_MOVE` while hovering over an object.
 *   - Triggers `ON_MOUSE_LEAVE` when the mouse leaves an object.
 *
 * @example
 * // Example usage:
 * bindMouseEventsToObject(viewer);
 *
 * // Ensure objects have methods corresponding to the eventMap keys:
 * const eventMap = {
 *   ON_CLICK: 'onClick',
 *   ON_Double_Click: 'onDoubleClick',
 *   ON_MOUSE_ENTER: 'onMouseEnter',
 *   ON_MOUSE_MOVE: 'onMouseMove',
 *   ON_MOUSE_LEAVE: 'onMouseLeave'
 * };
 */
export function bindMouseEventsToObject(viewer) {
  // 执行对象对应的方法
  function executeObjectMethod(object, methodName, payload) {
    if (!object || !methodName) return;
    if (typeof object[methodName] !== "function") return;
    object[methodName].call(object, payload);
  }

  // 鼠标点击事件
  viewer.screenSpaceEventHandler.setInputAction((movement) => {
    const pickedObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedObject) && pickedObject.id) {
      executeObjectMethod(pickedObject.id, eventMap.ON_CLICK, pickedObject);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  // 鼠标双击事件
  viewer.screenSpaceEventHandler.setInputAction((movement) => {
    const pickedObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedObject) && pickedObject.id) {
      executeObjectMethod(
        pickedObject.id,
        eventMap.ON_Double_Click,
        pickedObject,
      );
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  // 鼠标悬停事件
  let lastPickedObject = null;
  viewer.screenSpaceEventHandler.setInputAction((movement) => {
    const pickedObject = viewer.scene.pick(movement.endPosition);
    if (Cesium.defined(pickedObject) && pickedObject.id) {
      if (lastPickedObject !== pickedObject.id) {
        if (lastPickedObject) {
          executeObjectMethod(
            lastPickedObject,
            eventMap.ON_MOUSE_LEAVE,
            pickedObject,
          );
        }
        executeObjectMethod(
          pickedObject.id,
          eventMap.ON_MOUSE_ENTER,
          pickedObject,
        );
        lastPickedObject = pickedObject.id;
      }
      executeObjectMethod(
        pickedObject.id,
        eventMap.ON_MOUSE_MOVE,
        pickedObject,
      );
    } else if (lastPickedObject) {
      // 如果鼠标离开了上一个对象
      executeObjectMethod(
        lastPickedObject,
        eventMap.ON_MOUSE_LEAVE,
        pickedObject,
      );
      lastPickedObject = null;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
