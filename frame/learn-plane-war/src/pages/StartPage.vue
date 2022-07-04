<template> 
  <container>
    <Sprite  :texture="StartPage"></Sprite>
    <Sprite  :texture="StartBtn" @click="startGame" :interactive="true"></Sprite>
  </container>
</template>

<script>
import StartPage from "../assets/start_page.jpg";
import StartBtn from "../assets/startBtn.png";
export default {
  setup () {
    const startGame = () => {
      console.log(" start - game")
    }
    return {
      StartPage,
      StartBtn,
      startGame
    }
  }
}
</script>

<style lang="scss" scoped>

</style>