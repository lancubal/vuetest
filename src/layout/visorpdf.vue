<template>
  <div>
  <div v-if="store.state.gedo.curr_gedo.subsanado && store.state.user.userData['username'] != store.state.gedo.curr_gedo.usuarioSubsanador" class="customMessage p-d-flex">
    <i class="pi pi-info-circle p-mr-1 p-as-center"></i>
    <div class="p-as-center">
      <div class="p-col">
        Este documento fue subsanado y no puede ser visualizado.
      </div>
    </div>
  </div>
  <div v-else-if="!store.state.gedo.detalle.puedeVerDocumento" class="customMessage p-d-flex">
    <i class="pi pi-info-circle p-mr-1 p-as-center"></i>
    <div class="p-as-center">
      <div class="p-col">
        Este documento es reservado y no puede ser visualizado.
      </div>
    </div>
  </div>
    <pdfvue class="pdfv" :url="base64" style="height: 86vh;"></pdfvue>
  </div>
</template>

<script setup>
import Tag from 'primevue/tag';
import pdfvue from '../components/VuePDFViewer.vue'
import { computed, watch, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let base64 = ref('')
let buffer = computed(() => store.state.gedo.pdf)
onMounted(async () => {
  publicPdf()
})
watch(buffer, () => {
  publicPdf()
})

function publicPdf() {
  base64.value = 'data:application/pdf;base64,' + store.state.gedo.pdf

  // Descubrimos que para agregar el título al previsualizador podemos agregar al final del base64 '/' + título
  // Si el base64 termina con '==' el visor no funciona bien, pero si los borramos sí funciona, y podemos entonces agregar el título
  // Si el base64 termina con '=' y lo borramos no funciona, pero si también borramos el caracter anterior sí funciona
  // Entonces si termina con '=' y borramos los últimos 2 caracteres, el visualizador funciona correctamente cuando agregamos el título
  // no sabemos por qué, pero empíricamente funciona, lo probamos en todos los documentos que pudimos y en todos la solución funcionó correctamente

  if (base64.value.endsWith('='))
    base64.value = base64.value.substring(0, base64.value.length-2)
  base64.value += '/Documento'
}
</script>

<style lang="scss" scoped>
.pdfv {
  margin-top: 0rem;
}
.customMessage {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 10pt;
  font-family: 'Encode Sans', sans-serif;
  color: #6d5100;
  background-color: #FFECB3;
}
</style>