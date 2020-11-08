import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import 'src/dependency.js'
import Screen from 'utilities/screen'
import { ssrReadyComponents } from 'src/register'
Vue.use(Screen)
ssrReadyComponents.forEach(component => {
  Vue.use(component)
})
export function createApp () {
  const router = createRouter()

  const app = new Vue({
    router,
    render: h => h(App)
  })

  return { app, router }
}
