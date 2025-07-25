import * as Cesium from "cesium";


const viewerDefaultOptions = {
    animation: false, //是否显示动画控件
    baseLayerPicker: false, //是否显示图层选择控件
    fullscreenButton: false, //是否显示全屏按钮
    vrButton: false, // vr部件
    geocoder: false, // 位置搜索部件
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示点击要素之后显示的信息
    sceneModePicker: false, // 二三维切换部件
    timeline: false, //是否显示时间线控件
    navigationHelpButton: false, //是否显示帮助信息控件
    navigationInstructionsInitiallyVisible: false, // 导航说明显示
    scene3DOnly: true, //每个几何实例将只能以3D渲染以节省GPU内存

    shouldAnimate: true,
    // selectedImageryProviderViewModel: undefined, //当前图像图层的显示模型，仅baseLayerPicker设为true有意义
    // imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), //可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    // selectedTerrainProviderViewModel: undefined, //当前地形图层的显示模型，仅baseLayerPicker设为true有意义
    // terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), //可供BaseLayerPicker选择的地形图层ProviderViewModel数组
    // skyBox: false,  // 配置天空盒子或不显示天空盒子
    // skyAtmosphere: false, // 配置大气或不显示大气

    useDefaultRenderLoop: true, // 控制是否继续渲染
    // targetFrameRate: 30, // 控制渲染帧数
    maximumScreenSpaceError: 64, //屏幕空间最大误差
    showRenderLoopErrors: false, // 报错是否弹出错误
    useBrowserRecommendedResolution: false, // 设置为false使用window.devicePixelRatio属性
    automaticallyTrackDataSourceClocks: false, // 设置成true，使用公共clock对象，设置false，所有功能使用独立clock对象
    contextOptions: {
        webgl: {
            preserveDrawingBuffer: !0,
        },
        // requestWebgl2: true,
    }, // 创建场景时，配置webgl
    sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
    // orderIndependentTranslucency: true, // 如果为true且配置支持，则使用顺序无关的透明性。
    // creditContainer: document.getElementById("units"), // 部件容器
    // creditViewport: '', // 提示显示容器
    // dataSources: new Cesium.DataSourceCollection(), // 小部件数据源设置
    // terrainExaggeration: 1.0, // 夸大地形
    shadows: false, // 是否打开阴影
    terrainShadows: Cesium.ShadowMode.DISABLED, // 是否打开地形阴影
    resolutionScale: 1, //清晰度 0-1
    // mapMode2D: Cesium.MapMode2D.INFINITE_SCROLL, // 设置2D地图水平旋转
    // projectionPicker: false, // 设置为true,  ProjectionPicker部件会被创建,    ProjectionPicker：设置地球最佳视角
    // 如果为真，渲染帧只会在需要时发生，这是由场景中的变化决定的。启用可以减少你的应用程序的CPU/GPU使用，并且在移动设备上使用更少的电池，但是需要使用Scene#requestRender在这种模式下显式地渲染一个新帧。在许多情况下，在API的其他部分更改场景后，这是必要的。请参阅使用显式呈现提高性能。
    // 不是特别明白，应该是提高渲染性能的
    requestRenderMode: false, //启用请求渲染模式
    // 如果requestRenderMode为true，这个值定义了在请求渲染之前允许的模拟时间的最大变化。请参阅使用显式呈现提高性能。
    maximumRenderTimeChange: Infinity,

    fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处

    imageryProvider: false,
}
export function parseViewer(cesiumConfig) {
  const { viewer: viewerConfig } = cesiumConfig;
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  });
  document.body.appendChild(container);
  Cesium.Ion.defaultAccessToken = viewerConfig.config.token;
  const viewer = new Cesium.Viewer(container, {
    ...viewerDefaultOptions,
    ...viewerConfig.config,
  });
  viewer.cesiumWidget.creditContainer.style.display = "none"; //隐藏logo版权
  return viewer;
}
