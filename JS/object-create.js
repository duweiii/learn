let origin = {
  name: 1,
  age: 2
}

let c = Object.create(origin)
c.gender = 'male'
c.name = 'not override'
console.log( c )
// { gender: 'male', name: 'not override' }
console.log( c.__proto__ )
// {name: 1, age: 2}


// 通过Object.create创建一个新的对象并绑定原型链。