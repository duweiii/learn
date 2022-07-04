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
  let spa = document.createElement("span")
  spa.innerText = text;
  // return document.createTextNode(text)
  return spa;
}
const parentNode = (node) => {
  return node.parentNode;
}
const remove = (node) => {
  node.parentNode.removeChild(node)
}
const patchProp = (node, key, prevValue, nextValue) => {
  if( !nextValue ){
    node.removeAttribute(key)
  }else{
    node.setAttribute(key, nextValue)
  }
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
    let textNode =  createText(vdom);
    insert(textNode, parent )
    return ;
  }

  /**
   * react 在render中(ReactDom.render)还需要处理babel编译后的函数组件，判断isComponent,然后区分函数组件、类组件，执行类组件的render或者执行函数组件
   * 拿到返回结果（vdom） return render(vdom, parent)
   * 
   * vue 的模板编译是不是没有函数组件、类组件的概念，都是一些options
   */
  let dom = createElement(type);
  // 配合 diff，需要replace节点，所以在对应的vdom上添加这个element
  vdom.el = dom;

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

// diff update
export const diff = (oldVdom, newVdom) => {
  // 转移 el
  let el = newVdom.el = oldVdom.el;
  
  // tag type
  if( oldVdom.type !== newVdom.type ){
    let newElement = createElement(newVdom.type);
    el.replaceWith(newElement)
    newVdom.el = newElement;
  }else{
    const newProps = newVdom.props;
    const oldProps = oldVdom.props;
    for(let key in newProps){
      // 处理new有，old没有，或者两者都有但值不同的情况
      if(newProps[key] !== oldProps[key]){
        patchProp(el, key, null, newProps[key])
      }
    }

    for(let key in oldProps){
      if( !(key in newProps) ){
        patchProp(el, key, null, null)
      }
    }
  }

  // 处理 chuildren 
  /**
   * 因为我们在h函数中返回的children肯定是一个数组
   * 而且mountElement中的写法也是按照数组处理的children
   * 如果子元素中有文本或者数字，也是传入了下一次mountElement的，
   * 在下一次mountElement中挂载文本节点
   * 
   * 所以如果我们传入diff两个文本，是实现不了对比更新的
   * 只能另想办法了
   */
  const newChild = newVdom.children;
  const oldChild = oldVdom.children;
  const length = Math.min(newChild.length, oldChild.length);

  /**
   * 两个chilren肯定都是数组
   * 遍历数组，需要处理的情况
   * 2个都是string
   * old is string, new is object
   * old is object, new is string
   */
  // 处理共有部分
  for (let i = 0; i < length; i++) {
    // 如果两个节点都是对象，那继续diff
    if(typeof newChild[i] === 'object' && typeof oldChild[i] === 'object'){
      diff(oldChild[i], newChild[i])
    }else if (typeof oldChild[i] === 'string' && typeof newChild[i] === 'object') {
      let text = el.innerText;
      text = text.replace(oldChild[i],'')
      el.innerText = text;
      mountElement(newChild[i], el)
    }else if (typeof newChild[i] === 'string' && typeof oldChild[i] === 'object') {
      let newTextNode = createText(newChild[i])
      el.replaceChild(newTextNode, oldChild[i].el);
    }else{
      // 都是 string
      let text = el.innerText;
      text = text.replace(oldChild[i],newChild[i])
      el.innerText = text;
    }
  }
  // 处理newChild有，oldChild没有的部分
  if(newChild.length > oldChild.length){
    for(let i = length; i<newChild.length; i++){
      mountElement(newChild[i], el)
    }
  }
  // 处理oldChild有，newChild没有的部分
  if(newChild.length < oldChild.length){
    for(let i = length; i<oldChild.length; i++){
      // 处理oldChild[i] 是string的情况
      if( typeof oldChild[i] === 'string'){
        let text = el.innerText;
        text = text.replace(oldChild[i],"")
        el.innerText = text;
      }else{
        remove(oldChild[i].el)
      }
    }
  }
}