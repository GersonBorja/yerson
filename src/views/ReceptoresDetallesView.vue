<script setup>
(function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
const route = useRoute()
  
  const cliente= ref([])
  const articulos = ref([])
let estado = ref(false)
/*const traerDocumentos = async() => {
  try{
    let { data } = await axios.post('http://206.189.183.124/apiv4/documentos1')
    let informacion = data.documentos.find(item => item.documentoid == route.params.documentoId)
    documentos.value = informacion
    clienteid.value = documentos.value.receptorid
    console.log(clienteid.value)
  }catch(error){
    console.log(error)
  } finally{
    estado.value = true
  }
}
*/

const traerDocumentos = async() => {
  try{
    let { data } = await axios.post('http://206.189.183.124/apiv4/documentos1')
    console.log(data.documentos)
    let info = data.documentos.filter(item => item.receptorid == route.params.documentoId)
    articulos.value = info
    console.log(articulos.value)
  }catch(error){
    console.log(error)
  } finally {
    estado.value = true
  }
}

const detallesCliente = async() => {
  try {
    const datos = {
      clienteid: route.params.documentoId
    }
    let { data } = await axios.post('http://206.189.183.124/apiv4/clientes', datos)
    cliente.value = data.cliente
    console.log(cliente.value)
  }catch (error){
    console.log(error)
  } finally{
    traerDocumentos()
  }
}

detallesCliente()


</script>
<template>

  <h1 class="p-4 font-medium text-gray-700">{{ cliente.nombre }} </h1>
  <div class="pt-0 p-4 font-light">DIRECCIÓN: {{ cliente.nombre }}</div>
  <h2 class="p-4 font-medium text-gray-700">LISTA DE ARTÍCULOS</h2>
  <div v-if="estado">
      
      <div class="bg-gray-400 flex items-center justify-between">
        <h2 class="p-2 text-left w-[30%]">Codigo</h2>
        <h2 class="p-2 text-left w-[40%]">Descripción</h2>
        <h2 class="p-2 text-left w-[20%]">Cantidad</h2>
        <h2 class="p-2 text-center w-[10%]">✓</h2>
      </div>
      
      <ul v-for="item in articulos">
        <li>
          <ul v-for="arti in item.articulos"
            class="flex items-center justify-between border-b border-gray-200 border-solid">
            
            <li class="w-[30%] text-sm font-medium text-ellipsis text-left overflow-hidden whitespace-nowrap p-2"> {{
              arti.codigo }}</li>
            <li class="w-[40%] text-sm font-light text-ellipsis text-left overflow-hidden whitespace-nowrap p-2">{{
              arti.descripcion }}</li>
            <li class="w-[20%] font-light text-sm de text-left p-2">{{ arti.cantidad }}</li>
            <li class="w-[10%] text-center p-2">
              <input id="default-checkbox" type="checkbox" value=""
                class="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </li>
          </ul>
        </li>
      </ul>
    </div>
 <!-- <ul v-for="item in articulos">
    <div v-for="arti in item.articulos">
      <li>{{ arti.descripcion }}</li>
    </div>
  </ul>-->
</template>