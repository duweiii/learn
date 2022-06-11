// 抽离创建、修改dom的逻辑，便于后续实现自定义渲染器
const createElement = (type) => {
  return document.createElement(type)
}
const insert = (node, parent) => {
  parent.append(node)
}
const setElementText = (node, text) => {
  node.textContent = text;
}
const createText = (text) => {
  return document.createTextNode(text)
}
const parentNode = (node) => {
  return node.parentNode;
}
const remove = (node) => {
  node.parentNode.removeChild(node)
}
const patchProp = (node, key, prevValue, nextValue) => {
  node.setAttribute(key, nextValue)
}
const createComment = () => {}
const setText = () => {}
const nextSibling = () => {}

const isTextNode = vdom => {
  return typeof vdom === 'string' || typeof vdom === 'number';
}

// mount function
export const mountElement = (vdom, parent) => {
  const { type, props, children } = vdom;
  // 递归的终点，是文本、数字
  if(isTextNode(vdom)){
    insert( createText(vdom), parent )
    return ;
  }

  /**
   * react 在render中(ReactDom.render)还需要处理babel编译后的函数组件，判断isComponent,然后区分函数组件、类组件，执行类组件的render或者执行函数组件
   * 拿到返回结果（vdom） return render(vdom, parent)
   * 
   * vue 的模板编译是不是没有函数组件、类组件的概念，都是一些options
   */
  let dom = createElement(type);

  if( props ){
    for(let attr in props){
      patchProp(dom, attr, null, props[attr])
    }
  }

  if( Array.isArray(children) ){
    for(let child of children){
      mountElement(child, dom)
    }
  }

  insert(dom, parent)
}