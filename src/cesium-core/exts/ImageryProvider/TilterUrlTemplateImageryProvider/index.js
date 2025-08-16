import * as Cesium from "cesium";
export class TilterUrlTemplateImageryProvider extends Cesium.UrlTemplateImageryProvider {
  // 是否筛选瓦片
  isFilterTile = false;
  // 筛选瓦片的对象
  tileFilterMap = null;
  constructor(options) {
    super(options);
    this.requestImagePreInit(options);
  }
  requestImage(x, y, level, request) {
    if (this.isExistenceImag(x, y, level)) {
      return super.requestImage(x, y, level, request);
    }
    //   // 不存在该图，就返回一个promise，表示请求失败
    return Promise.reject();
  }
  requestImagePreInit(options) {
    // 手动保存自定义参数
    // debugger;
    this._options = options;
    const tileFilterMapName = "TileIndexPlugin-" + options.tileFilterName;
    this.tileFilterMap = window[tileFilterMapName] || null;
    this.isFilterTile = !!(options.tileFilterName && this.tileFilterMap); // 是否过滤瓦片
  }
  isExistenceImag(x, y, level) {
    if (!this.isFilterTile) return true; // 不是过滤模式，则全部返回true
    const key = `${level}/${x}/${y}`;
    if (this.tileFilterMap[key]) return true;
    return false;
  }
}

// Cesium.TilterUrlTemplateImageryProvider = TilterUrlTemplateImageryProvider;
window.TilterUrlTemplateImageryProvider = TilterUrlTemplateImageryProvider;
