import { createApp } from 'vue'
import { useModules } from '~/modules'
import App from './App.vue'
import '~/assets'

export const app = createApp(App)
useModules(app)
app.mount('#app').$nextTick(() => {
  window.postMessage({ client: 'mounted' }, '*')
})
