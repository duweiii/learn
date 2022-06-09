// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
import { Application, Container, Graphics, Sprite, Texture, Text } from "pixi.js"
import Logo from "./assets/logo.png"
const game = new Application({
  width: 500,
  height: 500
})

const box = new Container()
game.stage.addChild( box )

let rect = new Graphics()
rect.beginFill(0xffffff)
rect.drawRect(0,0,50,50)
rect.endFill()
rect.interactive = true;
rect.on("pointertap",()=>{
  console.log( "hello ")
})
game.stage.addChild( rect )

let img = new Sprite()
img.texture = Texture.from(Logo)
box.addChild(img)

let text = new Text('hello',{
  color: '0xffff'
})
box.addChild(text)

box.x = 200;
box.y = 200;
// function move (){
//   if( Math.random() > 0.5 ){
//     box.x++
//     box.y++
//   }else{
//     box.x -= 1
//     box.y -= 1
//   }
// }
// game.ticker.add(move)



document.body.appendChild( game.view )