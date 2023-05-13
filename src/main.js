import './assets/main.css'
import { useLogin } from './stores/login' // Asegúrate de que esta ruta de importación es correcta
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

let useStoreLogin = useLogin()

if (localStorage.getItem('token')) {
  useStoreLogin.agregarToken(true)
  useStoreLogin.agregarUsuario(localStorage.getItem('usuario'))
}

app.mount('#app')
