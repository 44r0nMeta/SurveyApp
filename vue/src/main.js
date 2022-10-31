import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./router"
import App from './App.vue'
import './index.css'
import { useUserStore } from './stores/userStore'


const app = createApp(App)


app.use(createPinia())

if (localStorage.getItem('auth')) {
  useUserStore().initialyzeUser()
}

app.use(router)
app.mount('#app')


