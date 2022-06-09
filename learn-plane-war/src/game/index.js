import { Application } from "pixi.js";

const game = new Application({
  width: 250,
  height:520
})

document.body.appendChild(game.view)

export function getRootNode(){
  return game.stage;
}