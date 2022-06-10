import { ref, watchEffect } from "./core/index.js";

const App = {
  render({age}){
    let div = document.createElement("div")
    div.textContent = age.value;
    return div;
  },
  setup(){
    let age = ref(1);
    globalThis.age = age;
    return {
      age,
    }
  }
}

export default App;