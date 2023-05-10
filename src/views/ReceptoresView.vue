<script setup>
  (function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
  import { ref } from 'vue'
  import axios from 'axios'
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
  <h1 class="font-medium uppercase text-gray-700 p-4">Listado de receptores </h1>
  <ul v-for="item in documentos">
    <li class="p-4 border-b border-solid border-gray-200 text-sm font-light">{{ item.receptor }}</li>
  </ul>
</template>