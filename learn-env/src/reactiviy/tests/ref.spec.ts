import { effect } from "../effect";
import { isReactive } from "../reactive";
import { ref } from "../ref"

describe("ref", () => {
  it("happy path", () => {
    let a = ref(1);
    expect(a.value).toBe(1)
  })

  it("track and trigger", () => {
    const a = ref(1)
    let dummy;
    let calls = 0;

    effect(()=>{
      calls++;
      dummy = a.value;
    })

    expect(calls).toBe(1);
    expect(dummy).toBe(1)

    a.value = 2;
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
    // set 的值没有发生变化， 不触发依赖
    a.value = 2;
    expect(calls).toBe(2)
  })

  it("typeof a.value === object , it should be a reactive object", () => {
    let a = ref({ foo: 1});
    expect( isReactive( a.value ) ).toBe(true) 
  })

})