import * as Cesium from "cesium";

// 获取当前 camera 的视角
/**
 * Retrieves the current position and orientation of the camera in the Cesium viewer.
 *
 * @param {Cesium.Viewer} viewer - The Cesium viewer instance containing the camera.
 * @returns {Object} An object containing the camera's position and orientation:
 *   - `destination` {number[]} - An array with the camera's longitude, latitude (in degrees), and height.
 *   - `orientation` {Object} - An object with the camera's orientation angles:
 *     - `heading` {number} - The heading angle (in degrees).
 *     - `pitch` {number} - The pitch angle (in degrees).
 *     - `roll` {number} - The roll angle (in degrees).
 */
export function getCameraPositionAndOrientation(viewer) {
  // 获取当前视图的摄像头对象

  const camera = viewer.camera;

  // 获取摄像头位置（经纬度和高度）
  const cartographic = Cesium.Cartographic.fromCartesian(camera.position);
  const longitude = Cesium.Math.toDegrees(cartographic.longitude);
  const latitude = Cesium.Math.toDegrees(cartographic.latitude);
  const height = cartographic.height;

  // 直接使用 camera.heading, camera.pitch, camera.roll 获取朝向角度
  const heading = Cesium.Math.toDegrees(camera.heading); // 方向角
  const pitch = Cesium.Math.toDegrees(camera.pitch); // 俯仰角
  const roll = Cesium.Math.toDegrees(camera.roll); // 翻滚角

  return {
    destination: [longitude, latitude, height],
    orientation: {
      heading: heading,
      pitch: pitch,
      roll: roll,
    },
  };
}
