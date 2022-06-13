class ReactiveEffect {
  private _fn: any;

  constructor(fn){
    this._fn = fn;
  }
  run(){
    activeEffect = this;
    return this._fn();
  }
}

let targetMap = new Map();
export function track(target, key){
  let depsMap = targetMap.get(target)
  if( !depsMap ){
    depsMap = new Map();
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get( key );
  if( !dep ){
    dep = new Set();
    depsMap.set( key, dep )
  }
  dep.add(activeEffect)
}

export function trigger(target, key){
  let depsMap = targetMap.get(target)
  let dep = depsMap.get( key );
  for( const effect of dep ){
    // 这里是为了处理只使用reactive 但不使用effect的情况下
    // 触发get进行依赖收集时，收集到的是个undefined，因为没有effect配合暴露依赖
    effect && effect.run()
  }
}

let activeEffect;
export function effect(fn){
  let _effect = new ReactiveEffect(fn)
  _effect.run();

  return _effect.run.bind(_effect)
}