import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$isSlotType = (slot, type) => {
  const [{ type: slotType }] = typeof slot === 'function' ? slot() : [{}]

  return slotType === type
}

app.mount('#app')
