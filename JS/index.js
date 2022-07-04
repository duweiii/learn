let str = 'www.taobao.toutiao.com'
// expect com.toutiao.taobao.www

function createCharArr(str, char){
  const dotArr = [];
  let i = 0;
  let len = str.length;
  while(i < len){
    if( str[i] === char ){
      dotArr.push( i );
    }
    i++;
  }
  return dotArr;
}

function createStringPartArr(str, dotArr){
  let arr = [];
  let index = 0;
  dotArr.forEach(dotIndex => {
    arr.push( str.slice(index, dotIndex) )
    index = dotIndex + 1;
  });
  arr.push( str.slice( dotArr[dotArr.length - 1] + 1 ))
  return arr;
}

function joint(arr){
  let str = ''
  arr.forEach( (s, index) => {
    if( index !== arr.length - 1 ){
      str += `${s}.`
    }else {
      str += s;
    }
  } );
  return str;
}

let dotArr = createCharArr(str, '.')
let stringPartArr = createStringPartArr(str, dotArr).reverse()
console.log( joint( stringPartArr ) )