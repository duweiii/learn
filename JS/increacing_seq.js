const arr = [ 4, 1, 2, 3, 2, 5, 7, 8, 10, 9, 22, 33]
// 结果不对，不是LIS
const splitSeq = arr => {
  const resultArray = [];
  let tempArray = [];
  arr.forEach( item => {
    if( item > tempArray[tempArray.length - 1] || tempArray.length === 0){
      tempArray.push(item)
    }else{
      resultArray.push( tempArray.slice(0) )
      tempArray = [item];
    }
  });
  resultArray.push(tempArray)
  return resultArray;
}

const longerSeq = arr => {
  let index;
  let prevLength = 0;
  arr.forEach((child,i)=>{
    if( child.length > prevLength ){
      index = i;
      prevLength = child.length;
    }
  })
  return arr[index]
}

console.log( splitSeq(arr) )
console.log( longerSeq( splitSeq(arr) ) )