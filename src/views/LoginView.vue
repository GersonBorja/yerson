<script setup>
  (function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { v4 as uuidv4 } from 'uuid'
  import { useLogin } from '@/stores/login'
  
  let useLog = useLogin()
  //let { token, usuario, agregarToken, agregarUsuario } = useLog
  
  const router = useRouter()
  
  const usr = ref('')
  const clave = ref('')
  const uuid = uuidv4()
  let validar = ref(false)
  
  const login = async() => {
    validar.value = true
    try{
      const credenciales = {
        usuario: usr.value,
        clave: clave.value
      }
      let enviar = await axios.post('http://3.144.185.76/apiv3/src/public/obtenerToken', credenciales)
      if(enviar.data.estado === 1){
        localStorage.setItem('token', enviar.data.token)
        localStorage.setItem('usuario', enviar.data.usuario)
        localStorage.setItem('uuid', uuid)
        useLog.agregarUsuario(enviar.data.usuario)
        useLog.agregarToken(true)
        
        router.push('/home')
      }else{
        alert(enviar.data.mensaje)
      }
    }catch (error){
      console.log(error)
    } finally {
      validar.value = false
    }
  }
</script>
<template>
  <div class="p-4">
    <h1 class="font-medium mb-4">INICIO DE SESIÓN</h1>
    <form class="w-full max-w-lg" ref="frmCintillo" @submit.prevent="login">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            USUARIO:
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name" type="text" placeholder="Escribe tu usuario" autocomplete="off" v-model="usr">
        </div>
        
        <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            CONTRASEÑA:
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name" type="password" placeholder="Escribe tu contraseña" autocomplete="off" v-model="clave">
        </div>
      </div>
      <input type="submit"
      :disabled="validar"
        class="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 border border-emerald-600 rounded mt-4"
        value="INICIAR SESIÓN">
    </form>
  </div>
</template>