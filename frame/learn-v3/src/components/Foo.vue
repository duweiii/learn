<template>
  <div>{{ userAge }} - {{ otherAge }} - {{ ageSum }}</div>
  <button @click="addAge">add userAge</button>
  <button @click="changeOtherAge">change other age</button>
  <button @click="setComputed">set computed</button>

  <div class="order-list" v-for="item in list" :key="item">{{ item }}</div>
  <button @click="changeList">change List order</button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from "@vue/runtime-core";

import _ from "lodash";
export default defineComponent({
  setup() {
    // ref
    let userAge = ref(0);
    const addAge = () => {
      userAge.value++;
    };

    let otherAge = ref(1000);
    const changeOtherAge = () => {
      otherAge.value++;
    };
    // reactive
    let list = reactive([1, 2, 3, 4, 5]);
    const changeList = () => {
      list = list.sort(() => Math.random() - Math.random());
    };

    // computed - getters
    // const ageSum = computed(() => {
    //   return userAge.value + otherAge.value;
    // });

    // computed - set
    let ageSum = computed({
      get: () => {
        return userAge.value + otherAge.value;
      },
      set: (val) => {
        userAge.value = otherAge.value = val / 2;
      },
    });

    const setComputed = () => {
      ageSum.value = 5000;
    };

    // watch
    // watch(userAge, () => {
    //   console.log("change user age trigger");
    // });
    // watch - 监听多个
    // watch([userAge, otherAge], (old, newv, onClear) => {
    //   console.log("执行拉", old, newv);
    // });
    // watch - 监听引用类型数据
    // watch(
    //   () => _.cloneDeep(list),
    //   () => {
    //     console.log("list was changed");
    //   }
    // );
    // watchEffect
    // watchEffect((onClear) => {
    //   console.log("how to trigger this hook", userAge.value);
    //   onClear(() => {
    //     console.log("component has been unmount or re-render");
    //   });
    // });
    // onBeforeMount(() => console.log("before Mount"));
    // onMounted(() => console.log("on Mounted"));
    // onBeforeUpdate(() => console.log("before update"));
    // onUpdated(() => console.log("on updated"));
    // onBeforeUnmount(() => console.log("before Unmount"));
    // onUnmounted(() => console.log("on Unmounted"));

    return {
      userAge,
      addAge,
      otherAge,
      changeOtherAge,
      ageSum,
      setComputed,
      list,
      changeList,
    };
  },
});
</script>

<style scoped></style>
