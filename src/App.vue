<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useLogin } from '@/stores/login'

const router = useRouter()
let useStoreLogin = useLogin()

const cerrarSesion = () => {
  useStoreLogin.eliminarLogin()
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  localStorage.removeItem('uuid')
  router.push('/')
  
}

</script>

<template>
<header class="bg-[#D3E3E3]" v-if="useStoreLogin.token">
        <div class="flex items-center justify-between p-4">
          <div><b>Usuario:</b> {{ useStoreLogin.usuario }}</div> <button @click="cerrarSesion">Cerrar Sesion</button>
        </div>
        <div class="px-4"><b>Pedidos Pendientes:</b> 3</div>
        <div class="p-4"><b>Pedidos:</b> 1581.1812.1231</div>
        <nav class="border-t border-solid border-gray-800">
          <ul>
            <router-link to="/home" class="inline-block text-blue-600 p-4 pr-4" active-class="text-black">Home</router-link>|
            <router-link to="/receptores" class="inline-block text-blue-600 p-4" active-class="text-black">Receptores</router-link>
          </ul>
        </nav>
  </header>

  <RouterView />
</template>
