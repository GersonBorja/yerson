<script setup>
  (function () {var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script); script.onload = function () { eruda.init() } })();
  import { ref } from 'vue'
  import axios from 'axios'
  
  const buscador = ref('')
  const busquedas = ref([])
  const estado = ref(false)
  const buscar = async() => {
    try {
      estado.value = true
      const datos = {
        material: buscador.value
      }
      let { data } = await axios.post('http://206.189.183.124/apiv4/inventario', datos)
      busquedas.value = data.articulos
      console.log(data)
    }catch(error){
      console.log(error)
    }finally {
      estado.value = false
    }
  }
</script>
<template>
  <h1 class="p-4 pb-0 uppercase font-medium text-gray-700">Inventario </h1>
  
  <form class="p-4" @submit.prevent="buscar">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only text-black">Buscar</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input type="search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-500 bg-white border-gray-300 placeholder-gray-400 text-gray-600 focus:border-gray-500"
        placeholder="Busca Productos, Codigos.." v-model="buscador" required>
      <button type="submit"
        class="text-white absolute right-2.5 bottom-2.5 bg-emerald-500 hover:bg-emerald-800 font-medium rounded-lg text-sm px-4 py-2 bg-emerald-600 hover:bg-emerald-700">Buscar</button>
    </div>
  </form>
  <div v-if="busquedas.length > 0">
    <div class="bg-emerald-50 p-2 font-light text-sm">
      Se han encontrado  <b class="font-medium">{{ busquedas.length }}</b> coincidencias de tu búsqueda <b class="font-medium">"{{ buscador }}"</b>
    </div>
    <div class="bg-gray-400 flex items-center justify-between">
      <h2 class="p-2 text-left w-[30%]">Codigo</h2>
      <h2 class="p-2 text-left w-[50%]">Descripción</h2>
      <h2 class="p-2 text-left w-[20%]">Cantidad</h2>
    </div>
    
    <ul v-for="item in busquedas" class="flex items-center justify-between border-b border-gray-200 border-solid">
      <li class="w-[30%] text-sm font-medium text-ellipsis text-left overflow-hidden whitespace-nowrap p-2"> {{
        item.codigo }}</li>
      <li class="w-[50%] text-sm font-light text-ellipsis text-left overflow-hidden whitespace-nowrap p-2"><router-link
          :to="`/articulo/${item.articuloid}`">{{ item.descripcion }}</router-link></li>
      <li class="w-[20%] font-light text-sm de text-left p-2">cantidad</li>
    </ul>
  </div>
  <div class="p-4" v-if="estado">Realizando busqueda...</div>
</template>
<style>
  * {
    outline: 0;
  }
</style>