// 实现 reactive
/**
 * 前面的 ref 实现，是单值，使用值或者修改值都会直接触发 set/get 方法
 * 但是对一个对象或数组创建响应式，就需要给其中的每一个属性都配置对应收集依赖的容器
 * 并且在全局添加一个依赖字典
 */
// 创建全局的依赖字典
import { ref } from './main.js'
const targetsMap = new Map();

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

// let a = reactive({ name: 'haha'})
// console.log( a.name )
// a.name = 'ene'
// console.log( a.name )