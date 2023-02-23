function animate(obj, target, callback) {
    // 很重要，清除之前的timer
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (obj.offsetLeft < target) {
            // Math.ceil 保证至少走一步
            obj.style.left =
                obj.offsetLeft +
                Math.ceil((target - obj.offsetLeft) / 50) +
                "px";
        } else if (obj.offsetLeft > target) {
            obj.style.left =
                obj.offsetLeft +
                Math.floor((target - obj.offsetLeft) / 50) +
                "px";
        } else {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 5);
}
