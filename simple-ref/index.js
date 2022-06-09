import { Ref, watchEffect } from "./main.js"

const a = new Ref(10)

watchEffect(()=>{
  let b = a.value + 10;
  console.log( b )
})

a.value = 20;