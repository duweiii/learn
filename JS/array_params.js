let arr_1 = [...'12345'];
let arr_2 = [...'abc'];

// Array.prototype.forEach((item,index)=>{
//   console.log( item, index )
// }, arr_1)

let arr = ['hello world', 'the definitive guide'];
let words = arr.map(item => item.split(' '));
// console.log( words.flat() )


let ori = [
  [
    [1,2],
    [3,4]
  ],
  [
    [5,6],
    [7,8],
    [9,10]
  ]
]
// console.log( ori.flat(2) )

let str = 'JavaScript'
Array.prototype.join.call(str, ' ');