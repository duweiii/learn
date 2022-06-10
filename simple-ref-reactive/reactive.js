// 实现 reactive
/**
 * 前面的 ref 实现，是单值，使用值或者修改值都会直接触发 set/get 方法,依赖也是在 get 中直接保存到这个实例上的。
 * 但是对一个对象或数组创建响应式，有一点是需要代理所有属性，还有一点是需要给其中的每一个属性都配置对应收集依赖的容器
 * 在全局添加一个依赖字典，给每一个属性都配置对应收集依赖的容器
 */
// 创建全局的依赖字典
import { ref } from './main.js'
const targetsMap = new Map();
/**
 * 这样实现的缺陷就是只能处理 { key: value } 这样只有一层的对象
 * 再多一层就没法处理了 { name: { age: 11 } } 
 */
export const reactive = (raw) => {
  return new Proxy(raw, {
    get(target, key){
      // 收集依赖
      let dep = getDependClass(raw, key);
      dep.collectDepend();
      return Reflect.get( target, key )
    },
    set(target, key, value){
      // 更新值，然后触发依赖
      let dep = getDependClass(raw, key);
      const result = Reflect.set( target, key, value )
      dep.triggerDepend();
      return result;
    },
  })
}
const getDependClass = (raw, key) => {
  let depsMap = targetsMap.get(raw)
  if( !depsMap ){
    depsMap = new Map();
    targetsMap.set(raw, depsMap);
  }
  let dep = depsMap.get(key)
  if( !dep ){
    dep = ref();
    depsMap.set(key, dep)
  }
  return dep;
}