<template>
  <button @click="changeAge">change Age in grandFather</button>
  <h1>this is grandfather</h1>
  <Dad @changeAge="changeAge" helloo="123123" />
</template>

<script>
import { provide, reactive } from "@vue/runtime-core";
import Dad from "./dad.vue";
export default {
  setup() {
    let userInfo = reactive({
      userName: "zhangsan",
      age: 26,
      gender: "male",
    });
    provide("info", userInfo);
    const changeAge = () => {
      userInfo.age++;
    };
    return {
      changeAge,
    };
  },
  components: {
    Dad,
  },
  // provide: {
  //   info: {
  //     userName: "zhangsan",
  //     age: 26,
  //     gender: "male",
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
