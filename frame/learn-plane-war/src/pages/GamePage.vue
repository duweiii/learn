<template>
  <container>
    <Sprite :texture="mapImg" x="0" y="0"></Sprite>
  </container>
</template>

<script>
import mapImg from "../assets/map.jpg";
export default {
  setup () {
    return {
      mapImg,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>