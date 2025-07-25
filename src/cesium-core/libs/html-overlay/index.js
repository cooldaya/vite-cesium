import * as Cesium from "cesium";
class CesiumHtmlOverlay {
  viewer = null;
  scene = null;
  cesiumViewerEl = null; // cesium viewer dom
  _element = null;
  popupMap = new Map();
  occluder = null;

  constructor(viewer) {
    this.viewer = viewer;
    this.scene = viewer.scene;
    this.cesiumViewerEl = viewer._element;
    this.initContainer();
    this._update = this._updateOverlays.bind(this);
    this.scene.postRender.addEventListener(this._update);
  }

  initContainer() {
    const element = (this._element = document.createElement("div"));
    element.className = "cesium-html-overlay";
    this.injectCss();
    this.cesiumViewerEl.appendChild(element);
  }
  injectCss() {
    if (document.getElementById("cesium-html-overlay-style")) return;
    const style = document.createElement("style");
    style.id = "cesium-html-overlay-style";
    style.innerHTML = `
    .cesium-html-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      /* 其他样式 */
    }
      .cesium-html-overlay-item{
        width:fit-content;
      }
  `;
    document.head.appendChild(style);
  }

  addPopup(option) {
    const popupObj = this.warpPopupToObject(option);
    if (!popupObj || this.popupMap.has(popupObj.id)) {
      return console.error("popup id 重复 或者传入参数有误");
    }
    this._element.appendChild(popupObj.el);
    this.popupMap.set(popupObj.id, popupObj);
    return popupObj;
  }

  warpPopupToObject(option) {
    const { position, html, id } = option;
    if (!position || !html) return;
    const el = document.createElement("div");
    el.classList.add("cesium-html-overlay-item");
    const show = option.show || true;
    el.style.display = show ? "block" : "none";
    el.innerHTML = html;
    // debugger
    return {
      option,
      el,
      show,
      position,
      id: id || this.getUUid(),
    };
  }

  getUUid() {
    const time = Date.now().toString(36);
    const random = Math.random().toString(36).slice(-8);
    return time + random;
  }

  _updateOverlays() {
    try {
      const cameraPosition = this.viewer.camera.positionWC;
      this.occluder = this.getCurrentOccluder(); // 获取occluder
      for (const [id, popupObj] of this.popupMap) {
        if (!popupObj.show) continue;
        const windowPos = Cesium.SceneTransforms.worldToWindowCoordinates(
          this.scene,
          popupObj.position,
        );

        const popupObjStyle = popupObj.el.style;
        if (!windowPos) {
          popupObjStyle.display = "none";
          continue;
        }

        const pointBoundingSphere = new Cesium.BoundingSphere(
          popupObj.position,
          1.0,
        );
        const inView =
          this.scene.frameState.cullingVolume.computeVisibility(
            pointBoundingSphere,
          ) !== Cesium.Intersect.OUTSIDE;
        const isGlobalFront = this.isGlobalFront(popupObj.position);
        const isVisible = inView && isGlobalFront;

        if (!isVisible) {
          popupObjStyle.display = "none";
          continue;
        }
        popupObjStyle.display = "block";
        const distance = Cesium.Cartesian3.distance(
          cameraPosition,
          popupObj.position,
        );
        // 你可以根据实际需求调整这两个参数
        const minimumPixelSize = popupObj.minimumPixelSize || 32; // 最小像素
        const maximumScale = popupObj.maximumScale || 4.0; // 最大缩放倍数
        // 计算当前 scale（假设默认尺寸为 32px，距离越远越小，越近越大，但有上下限）
        // debugger
        let scale = 1;
        if (distance > 0) {
          // 这里的 1000 可以根据实际场景调整，表示多远时正好是 minimumPixelSize
          scale = Math.max(minimumPixelSize / 32, 1000000 / distance);
          scale = Math.min(scale, maximumScale);
        }
        popupObjStyle.transform = `translate3d(${windowPos.x}px, ${windowPos.y}px, 0px) scale(${scale})`;
        // item.element.style.left = `${windowPos.x + (item.offset.x || 0)}px`;
        // item.element.style.top = `${windowPos.y + (item.offset.y || 0)}px`;
      }
    } catch (e) {
      console.error(e);
    }
  }
  isGlobalFront(point) {
    const occluder = this.occluder || this.getCurrentOccluder();

    return occluder.isPointVisible(point);
  }
  getCurrentOccluder() {
    const cameraPosition = this.viewer.camera.positionWC; // 世界坐标
    // 以地球中心为球心，地球半径为半径
    const ellipsoid = Cesium.Ellipsoid.WGS84;
    const radius = ellipsoid.minimumRadius;
    const occluderBoundingSphere = new Cesium.BoundingSphere(
      Cesium.Cartesian3.ZERO,
      radius,
    );

    const occluder = new Cesium.Occluder(
      occluderBoundingSphere,
      cameraPosition,
    );
    return occluder;
  }
}

let htmlOverlay = null;
function useHtmlOverlay(viewer) {
  htmlOverlay = htmlOverlay || new CesiumHtmlOverlay(viewer);
}

function addPopup(option) {
  htmlOverlay.addPopup(option);
}

export { useHtmlOverlay, addPopup };
