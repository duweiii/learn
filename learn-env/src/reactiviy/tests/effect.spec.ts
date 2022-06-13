import { effect } from "../effect";
import { reactive } from "../reactive";

describe( 'effect', ()=>{
  it("happy path", ()=> {
    const user = reactive({
      age: 10
    })

    let nextAge;
    effect(()=>{
      nextAge = user.age+1;
    })
    expect(nextAge).toBe(11);
    user.age++;
    expect(nextAge).toBe(12);
  })

  it("should return runner, when call effect",()=>{
    let count = 10;
    const runner = effect(()=>{
      count++;
      return 'foo'
    })
    expect(count).toBe(11)

    const res = runner();
    expect(count).toBe(12);
    expect(res).toBe('foo')
  })

  it('scheduler', () => {
    let dummy;
    let run;
    let obj = reactive({
      foo: 1
    })
    let scheduler = jest.fn(()=>{
      run = runner;
    })
    const runner = effect(()=>{
      dummy = obj.foo;
    }, { scheduler })
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo = 2;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    run()
    expect(dummy).toBe(2);
  })
})