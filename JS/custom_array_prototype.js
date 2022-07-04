// map forEach
Array.prototype.mapp = function(exec){
  const result = [];
  for(let index = 0; index<this.length; index++){
    result.push( exec(this[index], index) )
  }
  return result;
}

// filter
Array.prototype.filterr = function(exec){
  const result = [];
  for(let index = 0; index<this.length; index++){
    if( exec(this[index], index) ){
      result.push(this[index])
    }
  }
  return result;
}

// indexof / lastIndexOf
Array.prototype.indexOff = function(string){
  // indexOf
  let arr = this;
  // lastIndexOf
  // let arr = this.reverse();
  for(let index = 0; index<arr.length; index++){
    if( arr[i] === string ){
      return index;
    }
  }
  return -1;
}

// findIndex
Array.prototype.findIndexx = function(exec){
  for(let index = 0; index<this.length; index++){
    if( exec(this[index], index) ){
      return index;
    }
  }
  return -1;
}

// find
Array.prototype.findd = function(exec){
  for(let index = 0; index<this.length; index++){
    if( exec(this[index], index) ){
      return this[index];
    }
  }
  return null;
}

// some
Array.prototype.somee = function(exec){
  for(let index = 0; index < this.length; index++){
    if(exec(this[index], index)){
      return true;
    }
  }
}

// every
Array.prototype.somee = function(exec){
  for(let index = 0; index < this.length; index++){
    if(!exec(this[index], index)){
      return false;
    }
  }
  return true;
}

// concat 
Array.prototype.concatt = function(arr){
  let result = [...this];
  for(let i in arr){
    result.push(arr[i])
  }
  return result;
}

