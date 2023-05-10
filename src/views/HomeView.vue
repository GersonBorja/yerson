<script setup>
  (function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()


const documentos = ref([])
let estado = ref(false)
const traerDocumentos = async() => {
  try{
    let { data } = await axios.get('http://3.144.185.76/apiv3/src/public/documentos1')
    documentos.value = data.documentos
    console.log(documentos.value)
  }catch(error){
    console.log(error)
  } finally{
    estado.value = true
  }
}
traerDocumentos()
</script>
<template>
  <main>
    <div v-if="estado">
      
      <div class="bg-gray-400 flex items-center justify-between">
        <h2 class="p-2 text-left w-[30%]">Codigo</h2>
        <h2 class="p-2 text-left w-[40%]">Descripción</h2>
        <h2 class="p-2 text-left w-[20%]">Cantidad</h2>
        <h2 class="p-2 text-center w-[10%]">✓</h2>
      </div>
      
      <ul v-for="items in documentos">
        <li>
          <ul v-for="productos in items.articulos"
            class="flex items-center justify-between border-b border-gray-200 border-solid">
            
            <li class="w-[30%] text-sm font-medium text-ellipsis text-left overflow-hidden whitespace-nowrap p-2"> {{
              productos.codigo }}</li>
            <li class="w-[40%] text-sm font-light text-ellipsis text-left overflow-hidden whitespace-nowrap p-2"
              :title="productos.descripcion">{{
              productos.descripcion }}</li>
            <li class="w-[20%] font-light text-sm de text-left p-2">{{ productos.cantidad }}</li>
            <li class="w-[10%] text-center p-2">
              <input id="default-checkbox" type="checkbox" value=""
                class="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="p-4" v-else>
      Cargando Contenido...
    </div>
  </main>
</template>
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>