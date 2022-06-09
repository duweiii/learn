// 实现 ref 功能
let currentEffect = null;

class Ref{
  constructor(value){
    this._value = value
    this.effects = new Set()
  }

  get value(){
    this.collectDepend();
    return this._value;
  }

  set value(val){
    this._value = val;
    this.triggerDepend();
  }

  collectDepend(){
    if( currentEffect ){
      this.effects.add(currentEffect)
    }
  }

  triggerDepend(){
    this.effects.forEach(effect => {
      effect()
    })
  }
}

export const ref = function(value){
  return new Ref(value)
}

export const watchEffect = function(fn){
  currentEffect = fn;
  fn();
  currentEffect = null;
}