<script setup>
(function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const detallesArticulo = ref([])
  const estado = ref(false)
  const traerDetallesArticulo = async() => {
    try{
      const datos = {
        articuloid: route.params.articuloid
      }
      let { data } = await axios.post('http://206.189.183.124/apiv4/articulos', datos)
      detallesArticulo.value = data
    }catch(error){
      console.log(error)
    }finally {
      estado.value = true
    }
  }
  traerDetallesArticulo()
</script>
<template>
  <main v-if="estado">
    <h1 class="p-4 font-medium text-gray-700 uppercase">Información del artículo</h1>
  <div class="p-4 pt-0 font-light text-gray-700">{{ detallesArticulo.articulo.descripcion }}</div>
  <div class="p-4 pt-0 font-light text-gray-700">Codigo: {{ detallesArticulo.articulo.codigo }}</div>
  <div class="flex items-center justify-between border-b border-solid border-gray-400">
    <div class="bg-gray-100 w-[75%] p-2">Almacen</div>
    <div class="bg-gray-300 w-[25%] p-2">Cantidad</div>
  </div>
  <ul class="font-light text-gray-700 flex items-center justify-between" v-for="item in detallesArticulo.inventario">
    <li class="bg-gray-100 w-[75%] p-2">{{ item.almacen }}</li>
    <li class="bg-gray-300 w-[25%] p-2">{{ item.cantidad }}</li>
  </ul>
  </main>
  <div class="p-4" v-else>Cargando Artículo...</div>

</template>