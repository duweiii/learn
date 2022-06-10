// is text node 
const isTextNode = vdom => {
  return typeof vdom === 'string' || typeof vdom === 'number';
}

// is element node
const isElementNode = vdom => {
  return typeof vdom === 'object' && typeof vdom.type === 'string';
}

// is component
export const isComponent = vdom => {
  return typeof vdom.type === 'function';
}

// set attribute
const setAttrs = (dom, key, value) => {
  // 区分事件, 区分style
  if( key.startsWith("on") && typeof value === 'function' ) {
    dom.addEventListener(key.slice(2).toLowerCase(), value)
  } else if ( key === 'style' && typeof value === 'object') {
    Object.assign({}, dom.style, value);
  } else {
    dom.setAttribute(key, value)
  }
}

export const render = (vdom, parent = null) => {
  const mount = parent ? ( el => parent.appendChild(el)) : ( el => el );
  if( isTextNode(vdom) ){
    return mount(document.createTextNode(vdom))
  }else if ( isElementNode(vdom) ){
    const dom = mount(document.createElement(vdom.type));
    // 处理children
    // 如果children是string，直接render
    if(typeof vdom.children === 'string'){
      render(vdom.children, dom)
    }else if(Array.isArray(vdom.children)){
      for(let child of vdom.children){
        render(child, dom);
      }
    } else {
      // 函数组件或者类组件一起交给下次执行处理
      render(vdom.children, dom)
    }
    
    // 处理 attr
    for(let attr in vdom.props){
      setAttrs(dom, attr, vdom.props[attr])
    }
    return dom;
  }else if ( isComponent(vdom) ){
    const props = Object.assign({}, vdom.props, {
      children: vdom.children
    })
    if( Component.isPrototypeOf(vdom.type) ){
      const instance = new vdom.type(props)
      const result = instance.render();
      return render(result, parent)
    }else {
      const result = vdom.type(props)
      return render(result, parent)
    }
  } 
}