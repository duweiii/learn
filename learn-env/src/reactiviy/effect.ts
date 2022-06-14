class ReactiveEffect {
  private _fn: any;
  active = true;
  deps = [];
  onStop?: () => void;
  constructor(fn, public scheduler?){
    this._fn = fn;
  }
  run(){
    activeEffect = this;
    return this._fn();
  }
  stop(){
    if( this.active ){
      if( this.onStop ){
        this.onStop()
      }
      cleanupEffect(this)
      this.active = false;
    }
  }
}

function cleanupEffect(effect){
  effect.deps.forEach(dep => {
    dep.delete(effect)
  })
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
  if( !activeEffect ) return ;
  // 通过 target key 找到对应的依赖容器，收集依赖
  dep.add(activeEffect)
  // 反向收集，标注当前的类，存在于哪些集合中
  activeEffect.deps.push( dep )
}

export function trigger(target, key){
  let depsMap = targetMap.get(target)
  let dep = depsMap.get( key );
  for( const effect of dep ){
    // 这里是为了处理只使用reactive 但不使用effect的情况下
    // 触发get进行依赖收集时，收集到的是个undefined，因为没有effect配合暴露依赖
    if( effect?.scheduler ){
      effect.scheduler()
    }else{
      effect && effect.run()
    }
  }
}

let activeEffect;
export function effect(fn, option: any = {}){
  let _effect = new ReactiveEffect(fn, option?.scheduler)
  Object.assign(_effect, option)

  _effect.run();

  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;

  return runner;
}


export function stop(runner){
  let effect = runner.effect;
  effect.stop();
}