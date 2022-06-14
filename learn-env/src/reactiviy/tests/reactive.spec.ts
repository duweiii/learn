import { isReactive, reactive, readOnly } from "../reactive";

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

  it("is reactive", () => {
    let origin = { foo: 1};
    let obj = reactive(origin);
    expect( isReactive( obj ) ).toBe(true)
    expect( isReactive( origin ) ).toBe(false)
  })
})