import { ref, watchEffect } from "./main.js"
import { reactive } from "./reactive.js"

// ref
// const a = ref(10)

// watchEffect(()=>{
//   let b = a.value + 10;
//   console.log( b )
// })

// a.value = 20;

// reactive
let rea = reactive(
  {
    zhangsan: {
      age: 10
    }
  }
)

watchEffect(()=>{
  let b = rea.zhangsan.age + 10;
  console.log( b )
})

rea.zhangsan.age = 20;