import { ref, watchEffect, createApp } from "./core/index.js"
import App from './app.js'

createApp(App).mount(document.querySelector("#app"))