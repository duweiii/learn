import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

class Ref {
  private _rawValue;
  private _value;
  private dep;
  public __v_isRef = true;
  constructor(value){
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefEffect(this.dep);
    return this._value;
  }
  set value(newValue){
    if( hasChanged(this._rawValue, newValue) ){
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffect(this.dep)
    }
  }
}

export function ref( value ){
  return new Ref(value);
}
function trackRefEffect(dep){
  if( isTracking() ){
    trackEffect(dep)
  }
}
function convert(value){
  return isObject(value) ? reactive(value) : value;
}
export function isRef(ref){
  return !!ref.__v_isRef;
}
export function unRef(ref){
  return isRef(ref) ? ref.value : ref;
}