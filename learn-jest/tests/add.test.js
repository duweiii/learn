const add = require("../add.js")
test('1+2 = 3', () => { 
  const a = 1;
  const b = 2;
  const result = add(a,b);
  expect(result).toBe(3)
 })