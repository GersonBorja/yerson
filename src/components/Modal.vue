<script setup>
const emit = defineEmits(['confirmarCheckbox', 'cancelarCheckbox'])
defineProps(['codigo'])
</script>
<template>
  <div class="fixed top-0 left-0 z-10 flex items-center justify-center bg-black/40 w-full h-screen h-full">
    <div class="bg-white w-[90%]">
      <h1 class="font-bold p-4 text-gray-700 uppercase border-b border-solid border-gray-200">¿Estas seguro de quitar el artículo {{ codigo }}?</h1>
      <div class="p-4 flex items-center justify-between">
        <button @click="emit('cancelarCheckbox')" class="px-4 py-2 border border-solid border-gray-600 hover:bg-gray-200">Cancelar</button>
        <button @click="emit('confirmarCheckbox')" class="px-4 py-2 bg-emerald-500 border-solid border-emerald-700 text-white hover:bg-emerald-600">Confirmar</button>
      </div>
    </div>
    
</div>
</template>