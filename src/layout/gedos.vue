<template>
  <div v-if="store.state.ee.ee_num">
    <div
      class="p-fluid buscador-documentos"
      :class="{ hidden: store.state.app.gedos_isCollapsed }"
    >
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            class="p-inputtext buscador-documentos-inputText"
            type="search"
            v-model="str_busqueda"
            placeholder="Buscar"
          />
        </span>
      </div>
    </div>
    <div
      class="buscador-documentos-resultados"
      v-if="!store.state.app.gedos_isCollapsed"
    >
      <div v-if="str_busqueda != ''">
        <div v-if="gedos_filtrados.length === 0"> No se encontraron resultados</div>
        <div v-else-if="gedos_filtrados.length === 1">Se encontró 1 resultado</div>
        <div v-else>Se encontraron {{ gedos_filtrados.length }} resultados</div>
      </div>
    </div>

    <ScrollPanel
      id="scrollPanel"
      :class="{ no_encontrado: str_busqueda != '' && gedos_filtrados.length === 0 }"
      class="custombar"
    >
      <div
        v-for="(gedo, index) in gedos_filtrados"
        :key="gedo.orden"
        @click="on_gedo_selected(index, $event)"
      >
        <Divider
          :title="calcularDividerTitulo(gedo.fecha_asociacion, index)"
        ></Divider>
        <div class='card' :class="{selected : gedo == selected_gedo, subsanado : gedo.subsanado}" tabindex = "0" :aria-label="'Documento ' +  (gedo.orden + 1).toString() + (gedo.subsanado ? 'Subsanado' : '') + (gedo == selected_gedo ? 'Seleccionado' : 'No seleccionado') + gedo.numeroSadeDocumento.toString()">
          <div class="title p-text-truncate">
            {{ gedo.numeroSadeDocumento }}
          </div>
          <div class="subtitle p-text-truncate">{{ gedo.referencia }}</div>
          <div class="card-footer p-d-flex p-jc-between">
            <div class="p-as-center">
              <Chip class="card-footer-chip">#{{ gedo.orden + 1 }}</Chip>
              <Chip class="card-footer-chip">{{ gedo.tipodeDocumento }}</Chip>
              <Chip class="card-footer-chip">{{
                gedo.numeroSadeDocumento.substring(
                  gedo.numeroSadeDocumento.lastIndexOf('-') + 1
                )
              }}</Chip>
            </div>
            <div class="p-as-center card-footer-fecha">
              {{ calcularFechaGedoItemList(gedo.fecha_asociacion) }}
            </div>
          </div>
        </div>
      </div>
      <Divider></Divider>
    </ScrollPanel>

    <div
      v-if="str_busqueda != '' && gedos_filtrados.length === 0"
      class="info_panel"
      :class="{ hidden: store.state.app.gedos_isCollapsed }">
      <div class="info_title">Información</div>
      <ul class="info_list">
        <li>Puede que las palabras no estén escritas correctamente.</li>
        <li>Puede que las palabras no coincidan con las características de los Documentos vinculados:</li>
        <ul class="info_sublist">
          <li>Referencia.</li>
          <li>Tipo de Documento.</li>
          <li>Número de Orden.</li>
          <li>Número GDE.</li>
        </ul>
      </ul>
      <ul class="info_list">
        <li>Tenga en cuenta, que, además, se puede segmentar la búsqueda dentro del Número GDE por:</li>
        <ul class="info_sublist">
          <li>Actuación: <span>‘ACTO-‘</span></li>
          <li>Año: <span>‘-2021-‘</span></li>
          <li>Ecosistema: <span>‘-APN-‘</span></li>
          <li>Repartición: <span>‘-DNDE#JGM’</span></li>
          <li>Jurisdicción: <span>‘#JGM’</span></li>
        </ul>
      </ul>
    </div>
    <div
      class="p-text-right btn_descarga_zip"
      :class="{ hidden: store.state.app.gedos_isCollapsed }"
    >
      <label class='etiqueta izquierda'>Descargar todos los documentos</label>
      <Button
        @click="obtener_zip"
        type="button"
        icon="pi pi-download"
        class="p-button-raised p-button-primary"
        :loading="flags_zip.obteniendo"
        aria-label="Descargar todos los documentos"
        :disabled='store.state.app.gedos_isCollapsed'
      />
    </div>
    <div
      class="p-text-right collapsableButton"
      @click="store.dispatch('app/toggleGedos_isCollapsed')"
      v-tooltip.right="{ value: 'Expandir', disabled: !store.state.app.gedos_isCollapsed }"
    >
      <label class='etiqueta izquierda'>Colapsar</label>
      <Button
        class="p-button-outlined p-button-secondary"
        :icon="
          'pi ' +
          (store.state.app.gedos_isCollapsed
            ? 'pi-angle-double-right'
            : 'pi-angle-double-left')
        "
        :aria-label="store.state.app.gedos_isCollapsed ? 'Expandir panel de documentos' : 'Colapsar panel de documentos'"
      />
    </div>
  </div>
  <div v-else class="p-d-flex">
    <ProgressSpinner
      class="p-as-center"
      style="width: 50px; height: 50px"
      strokeWidth="8"
      animationDuration=".7s"
    />
  </div>
  <gedosDescarga
    :store='store'
    :zip_results='zip_results'
    :flags='flags_zip'
    ></gedosdescarga>
</template>
<script setup>
  import { download_base64 } from '../helpers/utils'
  import {
    computed,
    ref,
    onMounted,
    toHandlerKey,
    watch,
    watchEffect,
    reactive,
  } from 'vue'
  import { useStore } from 'vuex'
  import format from 'date-fns/format'
  import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
  import { ee_zip } from '../api/ee'

  import Button from 'primevue/button'
  import ScrollPanel from 'primevue/scrollpanel'
  import InputText from 'primevue/inputtext'
  import Chip from 'primevue/chip'
  import ProgressSpinner from 'primevue/progressspinner'
  import Divider from '../components/Divider.vue'
  import debounce from '../helpers/debounce'

  import gedosDescarga from './gedosDescarga.vue'

  const store = useStore()
  const ambiente = import.meta.env.VITE_APP_AMBIENTE
  console.log('ambiente', ambiente)

  let gedos_filtrados = ref([])

  let url_dev = ref('')
  let enlace_visible = ref(false)

  let selected_gedo = ref({})

  onMounted(() => {
    updateGedosPanel()
  })

  let gedos = computed(() => [...store.state.ee.documentos_vinculados])
  watch(gedos, updateGedosPanel)

  function updateGedosPanel() {
    gedos_filtrados.value = gedos.value
    var gedoIndex = gedos_filtrados.value.findIndex(x => x.numeroSadeDocumento == store.state.ee.gedo_num)
    if (gedoIndex == -1) gedoIndex = 0
    if (gedos_filtrados.value.length > 0)
      on_gedo_selected(gedoIndex)

    setTimeout(() => {
      var scrollContent = document.getElementById('scrollPanel').getElementsByClassName('p-scrollpanel-content')[0]
        scrollContent.scrollTo(0, gedoIndex * 73)
      }, 0)
  }

  async function on_gedo_selected(index, event) {
    let gedo_num = gedos_filtrados.value[index].numeroSadeDocumento
    store.commit('ee/SET_GEDO_NUM', gedo_num)
    selected_gedo.value = gedos_filtrados.value[index]
    store.dispatch('gedo/set_curr_gedo_vinculado', gedos_filtrados.value[index])
    var r = await traer_gedo(gedo_num)
  }

  //  ******* BUSQUEDA **********
  let str_busqueda = ref('')

  watch(str_busqueda, (nuevo, viejo) => {
    busqueda_debounced()
  })

  let busqueda_debounced = debounce(on_busqueda_change, 1000)
  async function on_busqueda_change() {
    if (str_busqueda.value.length > 0) {
      let filtrados_arr = []
      if(str_busqueda.value[0] === '#'
       && str_busqueda.value.length > 1
       && parseInt(str_busqueda.value.slice(1)) > 0
       && parseInt(str_busqueda.value.slice(1)) < gedos.value.length+1) {
        filtrados_arr.push(gedos.value.find(n => n.orden == parseInt(str_busqueda.value.slice(1))-1))
      }
      else {
        for (let i = 0; i < gedos.value.length; i++) {
        if (gedos.value[i].searchable.search(str_busqueda.value.toUpperCase()) != -1) {
          filtrados_arr.push(gedos.value[i])
        }
       }  
      }
      gedos_filtrados.value = filtrados_arr
      }
      else {
        gedos_filtrados.value = [...store.state.ee.documentos_vinculados]
      }
  }


  // *******   Gestión archivo ZIP *********

  let zip_results = reactive({
    conDocsNoDescargados: false,
    nrosDocNoDescargados: [],
    nrosDocSubsanadosNoDescargados: [],
    nrosDocReservadosNoDescargados: [],
  })
  let flags_zip = ref({
    sinDocsDescargados: false,
    obteniendo: false,
    dialog_visible: false
  })
  const obtener_zip = async () => {
    if(!flags_zip.value.sinDocsDescargados) { 
      zip_results.zipBase64 = ''
      zip_results.conDocsNoDescargados = false
      zip_results.nrosDocNoDescargados = []
      zip_results.nrosDocSubsanadosNoDescargados = []
      zip_results.nrosDocReservadosNoDescargados = []

      flags_zip.value.obteniendo = true
      flags_zip.value.dialog_visible = true
      try {
        let res = await ee_zip({ ee: store.state.ee.ee_num })
        flags_zip.value.sinDocsDescargados = res.nrosDocNoDescargados.length + res.nrosDocReservadosNoDescargados.length + res.nrosDocSubsanadosNoDescargados.length == store.state.ee.documentos_vinculados.length
        flags_zip.value.dialog_visible = true
        console.log(res)
        //zip_results.value = res
        for (var i in zip_results)
          zip_results[i] = res[i]
      } catch (error) {
        console.log(error)
        flags_zip.value.dialog_visible = false
      } finally {
        flags_zip.value.obteniendo = false
      }
    } else {
      flags_zip.value.dialog_visible = true
    }
  }

  const traer_gedo = async (gedo_num) => {
    store.commit('gedo/SET_TRAYENDO_GEDO', true)
    await store.dispatch('gedo/traer_detalle', gedo_num)
    if(store.state.gedo.curr_gedo.subsanado && store.state.user.userData['username'] != store.state.gedo.curr_gedo.usuarioSubsanador){
      await store.dispatch('gedo/traer_pdf_subsanado')
    } else if (!store.state.gedo.detalle.puedeVerDocumento){
      await store.dispatch('gedo/traer_pdf_reservado')
    } else {
      await store.dispatch('gedo/traer_pdf', gedo_num)
    }
    store.commit('gedo/SET_TRAYENDO_GEDO', false)
  }

  function calcularFechaGedoItemList(fecha) {
    const fechaDate = new Date(fecha)
    const fechaHorario = format(fechaDate, 'HH:mm')
    const diferenciaDeDias = differenceInCalendarDays(new Date(), fechaDate)
    if (diferenciaDeDias == 0) {
      return fechaHorario
    } else if (diferenciaDeDias == 1) {
      return 'Ayer ' + fechaHorario
    } else if (diferenciaDeDias >= 2 && diferenciaDeDias < 7) {
      return (
        [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
        ][fechaDate.getDay()] +
        ' ' +
        fechaHorario
      )
    } else {
      return format(fechaDate, 'dd/MM/yy')
    }
    return
  }

  function calcularDividerTitulo(fecha, index) {
    if (index === 0) {
      return calcularTituloFecha(fecha)
    } else if (
      calcularTituloFecha(gedos_filtrados.value[index - 1].fecha_asociacion) !=
      calcularTituloFecha(fecha)
    ) {
      return calcularTituloFecha(fecha)
    }
  }
  function calcularTituloFecha(fecha) {
    const fechaDate = new Date(fecha)
    const diferenciaDeDias = differenceInCalendarDays(new Date(), fechaDate)
    if (diferenciaDeDias == 0) {
      return 'Hoy'
    } else if (diferenciaDeDias == 1) {
      return 'Ayer'
    } else if (diferenciaDeDias >= 2 && diferenciaDeDias < 7) {
      return [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ][fechaDate.getDay()]
    } else if (diferenciaDeDias >= 7 && diferenciaDeDias < 14) {
      return 'Hace más de 1 semana'
    } else if (diferenciaDeDias >= 14 && diferenciaDeDias < 21) {
      return 'Hace más de 2 semanas'
    } else if (diferenciaDeDias >= 21) {
      return 'Hace más de 3 semanas'
    }
  }

</script>
<style lang="scss" scoped>
.gedos {
.collapsableButton, .btn_descarga_zip {
    padding-right: 13px;
  }

  :not(&.collapsed) .info_panel {
    width: 370px;
    transition-duration: 0.5s;
  }

  &.collapsed .info_panel {
    transition-duration: 0s;
  }

  :not(&.collapsed) #scrollPanel {
    width: 370px;
    transition-duration: 0.5s;
    transition-timing-function: ease-in;
    opacity: 1;
  }

  &.collapsed #scrollPanel {
    transition-duration: 0s;
    opacity: 0;
    pointer-events: none;
  }
}

.buscador-documentos {
  margin-top: 1rem;
  margin-right: 1rem;
}
.buscador-documentos-inputText {
  font-size: 12pt;
  font-family: 'Encode Sans', sans-serif;
}
.buscador-documentos-resultados {
  font-size: 10pt;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
}
.info_panel {
  position: absolute;
  padding-left: 5px;
  top: 230px;
  .info_title{
    font-weight: bold;
    padding-bottom: 15px;
  }
  .info_list {
    padding: 0;
    padding-left: 12px;
    font-size:13px;
    list-style-type: square;
    color: gray;
    .info_sublist {
      padding-left: 70px;
      color: black;
      list-style-type: square;
      font-style: italic;
      span {
        color: gray;
      }
      li {
        padding-left: 10px;
      }
      ::marker {
        font-size: 10px;
      }
    }
  }
}
.card {
  cursor: pointer;
  padding-inline: 16px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 16px;
  text-align: left;
  font-family: 'Encode Sans', sans-serif;
  background-color: white;
  .subtitle {
    color: #7a7575;
  }
}

.card-footer {
  margin-top: 0.5rem;
}
.card-footer-chip {
  font-size: 12px;
  margin-right: 0.5rem;
}
.card-footer-fecha {
  font-size: 14px;
}
.selected {
  color: white;
  background-color: #446dc5f2;
  .subtitle {
    color: white;
  }
}
:not(.selected).subsanado {
  background-color: #7F7F7F;
  color: white;
  .subtitle {
    color: white;
  }
}
:not(.selected).subsanado:hover {
  color: black;
  .subtitle {
    color: black;
  }
}
:not(.selected).card:hover {
  background-color: #5f92cc26;
}
.selected.card:hover {
  background-color: #98acc1f2;
}

::v-deep(.p-scrollpanel) {
  &.custombar {
    height: 70vh;
    .p-scrollpanel-bar {
      visibility: hidden;
      background-color: rgba(95, 146, 204, 0.4);
      opacity: 1;
      transition: background-color 0.2s;
      &:hover {
        background-color: rgba(95, 146, 204, 0.952);
      }
    }
  }
  &.custombar:hover .p-scrollpanel-bar-y{
    visibility: visible;
  }
  &.custombar.no_encontrado .p-scrollpanel-bar-y {
    visibility: hidden;
  }
}

</style>
