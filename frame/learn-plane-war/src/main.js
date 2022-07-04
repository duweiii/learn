// import { createApp } from 'vue'
import { createApp } from './runtimes-canvas'
import { getRootNode } from './game'
import App from './App.vue'

createApp(App).mount(getRootNode())
