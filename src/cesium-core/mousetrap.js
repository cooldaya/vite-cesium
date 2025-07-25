import Mousetrap from 'mousetrap'
// 使用快捷键
const mousetrapList = [
    {
        key: "c+v",
        description: "复制当前 camera 视角信息",
        callback() {
            function copyToClipboard(data) {
                // 如果是对象类型（例如 JSON），先将其转换为字符串
                const textToCopy =
                    typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);

                // 使用 Clipboard API 复制文本
                return navigator.clipboard.writeText(textToCopy);
            }

            copyToClipboard(window.cesiumCore.utils.camera.getCameraPositionAndOrientation()).then(
                () => {
                    alert("复制当前 camera 视角信息成功");
                }
            );
        }
    }
]


mousetrapList.forEach((item) => {
    Mousetrap.bind(item.key, function (e) {
        item.callback();
        return false; // 阻止默认事件
    });
});
