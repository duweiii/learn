import { isObject } from "../shared";
import { track, trigger } from "./effect";
import { ERactiveFlags, reactive, readOnly } from "./reactive";

const reactiveGet = createGetters();
const reactiveSet = createSetters();
const readOnlyGet = createGetters(true);

function createGetters(isReadonly = false){
  return function get(target, key){
    let res = Reflect.get(target, key)
    if( key === ERactiveFlags.isReactive){
      return !isReadonly;
    }else if(key === ERactiveFlags.isReadonly ){
      return isReadonly;
    }
    if( isObject(res) ) {
      return isReadonly ? readOnly(res) : reactive(res);
    }
    if( !isReadonly ){
      track(target, key)
    }
    return res;
  }
}

function createSetters(isReadonly = false){
  return function set(target, key, value){
    let res = Reflect.set(target, key, value)
    if( !isReadonly ){
      trigger(target, key)
    }
    return res;
  }
}

export const reactiveHandlers = {
  get: reactiveGet,
  set: reactiveSet
}

export const readonlyHandlers = {
  get: readOnlyGet,
  set(target, key, value){
    console.warn(`can't execute set, because this is a readOnly object`)
    return true;
  },
}
