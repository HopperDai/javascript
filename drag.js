// 拖拽
function drag(obj) {
    var disX = 0;
    var disY = 0;

    obj.onmousedown = function (ev) {
        var event = ev || event;

        disX = event.clientX - obj.offsetLeft;
        disY = event.clientY - obj.offsetTop;

        if (obj.setCapture) { // 事件捕获
            obj.mousemove = mousemove;
            obj.mouseup = mouseup;

            obj.setCapture(); // 调用事件捕获，解决 IE7 以下的拖拽 bug
        } else {
            document.mousemove = mousemove;
            document.mouseup = mouseup;
        }

        function mousemove(ev) {
            var event = ev || event;
            var left = event.clientX - disX;
            var top = event.clientY - disY;

            obj.style.left = left + 'px';
            obj.style.top = top + 'px';
        }

        function mouseup() {
            this.onmousedown = null;
            this.onmouseup = null;

            if (obj.releaseCapture) {
                obj.releaseCapture(); // 关闭事件捕获
            }
        }
        return false;
    }
}