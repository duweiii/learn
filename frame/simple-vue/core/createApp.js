import { mountElement } from "./mountElement.js";
import { watchEffect } from "./ref.js";

export function createApp(rootComponent){
  return {
    mount(rootContainer){
      let setupResult = rootComponent.setup();
      watchEffect(()=>{
        rootContainer.textContent = '';
        /**
         * 在这里有个疑问，依赖收集的是watchEffect内部的这个箭头函数
         * 当修改响应式对象，执行收集的依赖(也就是当前这个箭头函数)
         * 并没有重新执行setup，但是却可以在render函数中获取到更新后的值呢？
         * 
         * 原因：
         * setup 返回的是个引用，保存下这个指针后，
         * 后续set中修改了他的值，render重新执行，还是去这个指针对应的地址里取值，自然就是更新后的值。
         * 如果每次执行fn依赖，都重新执行 setup，就会这样↓
         * 一开始执行watchEffect，fn，fn中使用render，传入了 setup的返回值（setup内创建ref，返回 { ref }
         * 在render中使用后，依赖收集完成，后续触发set，更新值，触发依赖，重新执行fn，重新 render( setup() )，
         * 在setup中重新生成一个ref，返回一个新的 {}, render中使用他的值就还是初始值，没意义。
         */

        // 修改为处理 vdom
        const vdom = rootComponent.render( setupResult );
        mountElement(vdom, rootContainer)

        // 更新优化，diff
        
      })
    }
  }
}