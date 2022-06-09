import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

// describe( "Hello world component io test", () => {
//   // 对 props / slot 输入测试
//   // const todo = {
//   //   text: '1'
//   // }
//   // const wrapper = shallowMount(HelloWorld, {
//   //   propsData: {
//   //     todo
//   //   },
//   //   slots:{
//   //     default: 'is slot'
//   //   }
//   // })
//   // wrapper.text().toMatch("1")
//   // wrapper.text().toMatch("is slot")

//   // 自定义事件输入
//   // const wrapper = shallowMount(HelloWorld, {})
//   // wrapper.get("#someDom").trigger("click")
//   /**
//    * #someDomclick事件执行的是$emit("remove")
//    * 执行wrapper.emitted可以收集到所有触发的自定义事件
//    * 通过传入触发的自定义事件名可以获取到这个自定义事件的触发
//    * 收集到的对应的值是一个数组，数组内的元素为每一次执行时获取到的参数。
//    * 比如执行了两次remove，第一次接收到一个参数1 ，第二次接收到2，得到的结果如下
//    * remove: [ [1], [2] ]  
//    */
//   // expect(wrapper.emitted("remove")[0]).toEqual([0])
// })

describe( "Hello world component io test", () => {
  // btn事件触发后会把一个变量的值更新为2，然后页面上会显示2
  // 这个单元测试的思路就是，触发button的click事件，然后看视图有没有更新
  const wrapper = shallowMount(HelloWorld);
  wrapper.get("#btn").trigger("click");
  expect( wrapper.text() ).toContain("2")
})

/**
   * 但实际结果发现页面还是1，没有更新为2
   * 原因：
   *  vue对视图更新做了优化，
   *  每次执行栈中的操作，
   *  都会放到下一个微任务或者宏任务去执行
   *  这就意味着，我们的代码在执行时
   *  操作完数据，试图去获取到最新的dom时
   *  vue中更新dom的逻辑被分配到了微任务中还未执行
   *  所以是获取不到的
   *  所以可以通过 nextTick 或者分配一个宏任务的形式
   *  来实现抓取最新dom
   * 实现异步代码的校验：
   *  对于当前的这个校验，
   *  需要知道wrapper.get().trigger返回的是个promise对象
   *  所以我们可以通过异步等待的方式来实现
   *  
   */

describe( "Hello world component io test", async () => {
  const wrapper = shallowMount(HelloWorld);
  await wrapper.get("#btn").trigger("click");
  expect( wrapper.text() ).toContain("2")
})


describe( "Hello world component io test", async () => {
  const wrapper = shallowMount(HelloWorld);
  await wrapper.get("#input").setValue("hello");
  expect( wrapper.text() ).toContain("hello")
})

describe( "Hello world component io test", (done) => {
  const wrapper = shallowMount(HelloWorld);
  wrapper.get("#input").setValue("hello").then(() => {
    expect( wrapper.text() ).toContain("hello")
    done();
  })
})











