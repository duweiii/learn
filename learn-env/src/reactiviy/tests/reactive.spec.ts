import { reactive } from "../reactive";

describe("reactive", ()=>{
  it("happy path", ()=>{
    const origin = {
      age: 10
    }
    const user = reactive( origin )
    expect(user).not.toBe(origin)
    expect(user.age).toBe(10)
    user.age = 11;
    expect(user.age).toBe(11)
  })
})