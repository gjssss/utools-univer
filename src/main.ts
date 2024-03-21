import { createApp } from 'vue'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

if (import.meta.env.DEV)
  window.utools = utoolsPolyfill() as any

const app = createApp(App)
app.mount('#app')
