import { diff, mountElement } from "./mountElement.js";
import { watchEffect } from "./ref.js";

export function createApp(rootComponent){
  return {
    mount(rootContainer){
      let oldVNodeTree;
      let isMounted = false;
      let setupResult = rootComponent.setup();
      
      watchEffect(()=>{
        const vdom = rootComponent.render( setupResult );
        // 判断是否需要diff
        if( !isMounted ){
          isMounted = true;
          oldVNodeTree = vdom;
          mountElement(vdom, rootContainer)
        }else{
          const vdom = rootComponent.render( setupResult );

          diff(oldVNodeTree, vdom);
          
          oldVNodeTree = vdom;
        }
      })
    }
  }
}