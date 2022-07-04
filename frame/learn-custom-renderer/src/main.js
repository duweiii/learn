import { createRenderer } from 'vue'
import App from './App.vue'

const renderer = createRenderer({
  createElement(type){
    const element = document.createElement(type)
    return element;
  }, // 创建元素 - type
  insert(el, parentNode){
    console.log( el , parentNode)
    parentNode.append(el)
  },  // append child - el - parentNode
  setElementText(node, text){
    node.innerText = text;
  },
  createText(text){
    let element = document.createTextNode(text)
    return element;
  },
  createComment(text){
    let element = document.createComment(text)
    return element;
  }
})

renderer.createApp(App).mount(document.querySelector("#app"))