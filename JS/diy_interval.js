// 出一个闭包的题，20行以内就可以写完

// 用setTimeout 写一个自定义的 setInterval，并配套一个 自定义的clearInterval

function customSetInteval(fn, delay) {
  let timer = { value: ''};
  (function interval(){
    fn()
    timer.value = setTimeout(interval ,delay);
  })();
  return timer;
}

function customClearInterval(timer) {
  clearTimeout(timer.value)
}

let i = 0;
let x = 0;
const timer = customSetInteval(()=>{
  console.log( `i: ${i++}` )
},500)
const timer_2 = customSetInteval(()=>{
  x += 10;
  console.log( `x: ${x}` )
}, 500)

setTimeout(()=>{
  // customClearInterval(timer)
  customClearInterval(timer_2)
},3000)