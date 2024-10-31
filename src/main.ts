import './assets/main.scss'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const head = createHead()
const pinia = createPinia()

app.use(head)
app.use(pinia)
app.use(router)

app.mount('#app')
