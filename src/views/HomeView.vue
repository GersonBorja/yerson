<script setup>
  (function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const usuario = localStorage.getItem('usuario')
const documentos = ref([])
let estado = ref(false)
const traerDocumentos = async() => {
  try{
    let { data } = await axios.get('http://18.117.196.71/apiv3/src/public/documentos1')
    documentos.value = data.documentos
    console.log(documentos.value)
  }catch(error){
    console.log(error)
  } finally{
    estado.value = true
  }
}
const cerrarSesion = () => {
  localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      localStorage.removeItem('uuid')
      router.push('/')
}
traerDocumentos()
</script>
<template>
  <header class="p-4 bg-[#D3E3E3]">
    <nav>
      <ul>
        <li class="flex items-center justify-between mb-2"><div><b>Usuario:</b> {{ usuario }}</div> <button @click="cerrarSesion">Cerrar Sesion</button></li>
        <li class="mb-2"><b>Pedidos Pendientes:</b> 3</li>
        <li><b>Pedidos:</b> 1581.1812.1231</li>
      </ul>
    </nav>
  </header>
  <main>
    <div class="bg-gray-400 flex items-center justify-between">
      <h2 class="w-[20px]">check</h2>
      <h2>Codigo</h2>
      <h2 class="w-2/5">Descripción</h2>
      <h2>Cantidad</h2>
    </div>
    <div v-if="estado">
      <ul v-for="items in documentos">
        <li>
          <ul v-for="productos in items.articulos"
            class="flex items-center justify-between border-b border-gray-200 border-solid p-2">
            <li class="w-[20px]">
              <input id="default-checkbox" type="checkbox" value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </li>
            <li class="font-medium"> {{ productos.codigo }}</li>
            <li class="w-2/5 font-light text-ellipsis text-left overflow-hidden whitespace-nowrap">{{
              productos.descripcion }}</li>
            <li class="font-light">{{ productos.cantidad }}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-else>
      Cargando
    </div>
  </main>
</template>