import './assets/main.css'
import { useLogin } from './stores/login' // Asegúrate de que esta ruta de importación es correcta
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
let useStoreLogin = useLogin()

if (localStorage.getItem('token')) {
  useStoreLogin.agregarToken(true)
  useStoreLogin.agregarUsuario(localStorage.getItem('usuario'))
}

app.mount('#app')
