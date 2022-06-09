<template>
  <div>
    <h2>this is dad</h2>
    <button @click="handleClick">click to change Age - in Dad Component</button>
    <Son />
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Son from "./son.vue";
export default {
  setup(props, ctx) {
    const handleClick = () => {
      ctx.emit("changeAge");
    };
    return {
      handleClick,
    };
  },
  inheritAttrs: false,
  components: {
    Son,
  },
};
</script>

<style lang="scss" scoped></style>
