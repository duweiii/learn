<template>
  <h3>this is son ; data -> {{ info.age }}</h3>
</template>

<script>
export default {
  setup() {
    return {};
  },
  inject: ["info"],
};
</script>

<style lang="scss" scoped></style>
