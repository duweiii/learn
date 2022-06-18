import { createVNode } from "./createVNode"

export function createApp( rootComponent ){
  return {
    mount(rootContainer){
      const vNode = createVNode(rootComponent);
    }
  }
}