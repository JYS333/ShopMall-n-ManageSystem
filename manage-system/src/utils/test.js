// 节流函数
// 会先执行一次
const throttle = (fn, delay = 1000) => {
    //距离上一次的执行时间
    let lastTime = 0
    return function () {
      let _this = this
      let _arguments = arguments
      let now = new Date().getTime()
      //如果距离上一次执行超过了delay才能再次执行
      if(now - lastTime > delay){
        fn.apply(_this,_arguments)
        lastTime = now
      }
    }
  }
// 会delay时间后才执行
  const throttle2 = function(func, wait) {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
}

// 防抖函数
// 到delay时间后才会执行
const debounce = function (func, wait) {
    let timer;
    return function() {
        let context = this; // 注意 this 指向
        let args = arguments; // arguments中存着e
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait) 
    }
}
// 会先立即执行一次
const debounce2 = (func, delay = 1000, immediate = true) => {
    //闭包
    let timer = null
    //不能用箭头函数
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      console.log(immediate, timer)
      if (immediate && !timer) {
        func.apply(this,arguments)
      }
      timer = setTimeout(() => {
        func.apply(this,arguments)
      }, delay)
    }
  }


module.exports = {
    throttle,
    throttle2,
    debounce,
    debounce2
}