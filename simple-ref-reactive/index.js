import { ref, watchEffect } from "./main.js"

const a = ref(10)

watchEffect(()=>{
  let b = a.value + 10;
  console.log( b )
})

a.value = 20;