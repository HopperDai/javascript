// 事件绑定
// obj：绑定对象     ev：事件名称     fn：处理函数
function eventBinding(obj, ev, fn) {
    if (obj.attachEvent) {    // IE
        obj.attachEvent('on' + ev, fn);
    } else {    // chrome,ff
        obj.addEventListener(ev, fn, false);
    }
}