<template>
  <div class="home">
    <Foo v-if="showFoo" />
    <hr />
    <Grand-father />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Foo from "@/components/Foo.vue";
import GrandFather from "@/components/grandFather.vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      showFoo: true,
    };
  },
  components: {
    Foo,
    GrandFather,
  },
});
</script>
