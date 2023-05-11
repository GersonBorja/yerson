<script setup>
  (function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
  import { ref } from 'vue'
  import axios from 'axios'
  import { RouterLink } from 'vue-router'
  const documentos = ref([])
let estado = ref(false)
const traerDocumentos = async() => {
  try{
    let { data } = await axios.post('http://206.189.183.124/apiv4/documentos1')
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
  <div v-if="estado">
      <ul v-for="item in documentos">
    <li class="p-4 border-b border-solid border-gray-200 text-sm font-light"><router-link :to="`/receptor/${item.receptorid}`">{{ item.receptor }}</router-link></li>
  </ul>
  </div>
<div class="p-4" v-else>
  Cargando Contenido de Receptores....
</div>
</template>