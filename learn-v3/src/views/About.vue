<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div
      v-for="item in list"
      :key="item.name + '__'"
      class="item"
      :id="item.cls"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
export default {
  setup() {
    let list = reactive([
      { name: 1, cls: "item_1" },
      { name: 2, cls: "item_2" },
      { name: 3, cls: "item_3" },
      { name: 4, cls: "item_4" },
      { name: 5, cls: "item_5" },
    ]);
    return {
      list,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm.list);
    });
  },
};
</script>

<style scoped>
.about {
  width: 100%;
  height: 4000px;
}
.item {
  height: 800px;
}
</style>
