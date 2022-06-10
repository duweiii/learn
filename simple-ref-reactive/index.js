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
let rea = reactive({ age: 10 })

watchEffect(()=>{
  let b = rea.age + 10;
  console.log( b )
})

rea.age = 20;