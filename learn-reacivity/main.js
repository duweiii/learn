import { effect, ref } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

// reactivity 
/**
 * 核心
 * 1. 收集依赖
 * 2. 触发依赖
 */
// let a = ref(10);

// effect(()=>{
//   let b = a.value + 10;
//   console.log( b )
// })

// a.value = 20 ;

// 模拟数据驱动视图更新
// let content = ref('hello world')

// const view = content => {
//   let div = document.createElement('div')
//   div.innerText = content.value;
//   document.body.append(div)
// }

// effect(()=>{
//   view(content)
// })

// window.content = content;

// 模拟 sfc
const app = {
  render({content}){
    effect(()=>{
      document.querySelector("#app").textContent = '';
      const div = document.createElement("div")
      div.innerText = content.value;
      document.querySelector("#app").append(div)
    })
  },

  setUp(){
    let content = ref('hahahaha')
    return {
      content
    }
  }
}

app.render( app.setUp() )