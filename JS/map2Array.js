let map = new Map()
let i = 0 ;
while(i < 10){
  map.set(i, `${i}-${i}`);
  i++;
}
console.log("map",map)
let arr = [...map]
console.log( arr )