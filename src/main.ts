import { createApp } from 'vue'
import App from './App.vue'
import { resolveFilePayload } from './utils/resolvePayload'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

if (import.meta.env.DEV)
  window.utools = utoolsPolyfill() as any

if (import.meta.env.MODE === 'utools') {
  utools.onPluginEnter((action) => {
    if (action.type === 'files') {
      resolveFilePayload(action.payload)
    }
  })
}

const app = createApp(App)
app.mount('#app')
