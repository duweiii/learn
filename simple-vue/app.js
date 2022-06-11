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
    return h('div', 
      {id:'div-id', class:'div-class'} , 
      h('p', {id: 'p-id'}, 'p-content-text' ), 
      h( 'article', { name:"article-name"}, 'article-content-text: ' + age.value ) 
    )
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