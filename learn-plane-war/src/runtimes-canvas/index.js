import { Container, Sprite, Texture } from "pixi.js";
import { createRenderer } from "vue";

const renderer = createRenderer({
  createElement(type){
    let element;
    switch(type){
      case 'container':
        element = new Container()
        break;
      case 'Sprite':
        element = new Sprite()
        break;
      default:
        break;
    }
    return element;
  },
  insert(node,parent){
    if( node ){
      parent.addChild(node)
    }
  },
  patchProp(node, key, prevValue, nextValue){
    switch(key){
      case 'texture':
        node.texture = Texture.from(nextValue)
        break;
      case 'onClick':
        node.on("pointertap", nextValue)
        break;
      default:
        node[key] = nextValue;
        break;
    }
  },
  createComment(){}
  // setElementText createText remove parentNode 
  // createComment setText nextSibling
})


export function createApp(rootComponent){
  return renderer.createApp(rootComponent)
}