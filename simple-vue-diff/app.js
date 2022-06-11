import { h, reactive } from "./core/index.js";

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
    // return h('div', 
    //   {id:'div-id', class:'div-class'} , 
    //   h('p', {id: 'p-id'}, 'p-content-text' ), 
    //   h( 'article', { name:"article-name"}, 'article-content-text: ' + age.value ) 
    // )
    // 测试type改变
    // return h(age.type, 
    //   {id:'div-id', class:'div-class'} , 
    //   h('p', {id: 'p-id'}, 'p-content-text' ), 
    //   h( 'article', { name:"article-name"}, 'article-content-text') 
    // )
    // 测试props改变
    return h('div', 
      age.props,
      h('p', {id: 'p-id'}, 'p-content-text' ), 
      h( 'article', { name:"article-name"}, 'article-content-text') 
    )
  },
  setup(){
    let age = reactive({ 
      type: 'div',
      count: 1,
      props: {
        a: 'a'
      }
    })
    globalThis.age = age;
    return {
      age,
    }
  }
}
export default App;