// 使用快捷键

function copyToClipboard(data) {
  // 如果是对象类型（例如 JSON），先将其转换为字符串
  const textToCopy =
    typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);

  // 使用 Clipboard API 复制文本
  return navigator.clipboard.writeText(textToCopy);
}

Mousetrap.bind(["c+v"], function (e) {
  copyToClipboard(window.cesiumCore.getCameraPositionAndOrientation()).then(
    () => {
      alert("复制当前 camera 视角信息成功");
    }
  );
});
