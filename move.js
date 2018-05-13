// 运动框架
// 适用范围：1.css2；2.DOM 操作
// 功能：1.物体多个不同属性运动；2.链式运动
// 参数：1.obj-运动对象；2.attrJson-运动需要改变的属性，json 格式，适用于多个属性的改变，如：{ width: 400 } ；3.callBack-回调函数

function move(obj, attrJson, callBack) {
    clearInterval(obj.timer); // 运动每次开启前清除一下定时器，防止多次启动同一个定时器

    var stop = true; // 定时器停止开关。当所有属性达到目标值开启

    obj.timer = setInterval(function () {

        for (var attr in attrJson) { // 遍历属性
            var currentAttr = 0; // 定义一个变量储存物体当前的属性

            if (attr === 'opacity') { // 透明度的属性值可能为小数，需要区别于其他的属性
                currentAttr = Math.round(parseFloat(getStyle(obj, attr)) * 100); // 浮点数乘法存在近似值的 bug ，如：0.007 * 100 ；取四舍五入值
            } else {
                currentAtrr = parseInt(getStyle(obj, attr));
            }

            if (currentAttr != attrJson[attr]) {
                stop = false;
            }

            var speed = (attrJson[attr] - currentAttr) / 6; // 运动速度：(目标值 - 当前属性值)/系数
            speead = speed > 0 ? Math.ceil(speed) : Math.floor(speed); // 取整，因为最小样式单位是 1px ，不应该存在小数像素

            if (attr === 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (currentAttr + speed) + ')'; // IE
                obj.style.opacity = (currentAttr + speed) / 100; // Chrome
            } else {
                obj.style[attr] = currentAttr + speed + 'px';
            }
        }

        if (stop) {
            clearInterval(obj.timer);
            if (callBack) {
                callBack(); // 执行回调函数
            }
        }

    }, 30); // 运动时间间隙设为 30 毫秒，符合人眼要求
}

// 获取非行间定义的样式
function getStyle(obj, name) {
    if (obj.currentStyle) { // IE
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name]; // Chrome、FireFox
    }
}