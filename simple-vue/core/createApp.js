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
         * 是因为setup函数执行的返回值是一个对象，是一个引用指针
         * 当后续触发响应式对象的set，更新值之后，重新执行依赖，再次执行到这个render
         * 在render内获取到这个对象的引用(一个拷贝指针)，
         * 通过这个指针再去访问原来的内存中value的值，这时候已经被修改过了，自然就是最新的了
         * 
         * 总结起来：
         * setup只执行一次，返回的是一个引用，把这个引用保存下来，
         * 后续重新执行依赖，还是传入这个引用，
         * 重新执行依赖之前，已经在set中把值更新了，
         * 所以接下来执行依赖，再通过这个引用使用内存中的值，就已经是最新的了。
         * 
         * 错误用法：
         * const element = rootComponent.render( rootComponent.setup() )
         * 数据变化时，不会触发视图更新
         * 原因：
         * 可以正常进行依赖的收集与触发，
         * 但是当再次触发依赖时，
         * 重新执行rootComponent.setup方法，得到了一个新的引用，还是初始值
         * 所以虽然值修改，触发依赖了，但又重新生成了一个响应式对象，所以显示的还是初始值。
         * 
         * 初始化时，我们使用了某个响应式对象的值，然后这个值修改后，重新执行依赖，
         * 我们需要的是这个对象最新的值
         * 所以要保持对同一个对象的引用
         */
        const element = rootComponent.render( setupResult )
        rootContainer.append(element)
      })
    }
  }
}