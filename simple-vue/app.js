import { ref, h } from "./core/index.js";

// const App = {
//   renzder({age}){
//     let div = document.createElement("div")
//     div.textContent = age.value;
//     return div;
//   },
//   setup(){
//     let age = ref(1);
//     globalThis.age = age;
//     return {
//       age,
//     }
//   }
// }

// 修改为 render function
const App = {
  render({age}){
    return h('div', null , 123)
  },
  setup(){
    let age = ref(1);
    globalThis.age = age;
    return {
      age,
    }
  }
}
export default App;