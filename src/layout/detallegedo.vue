<template>

<!-- Tabs-->

  <TabView
    aria-label="Detalles del documento"
    class="customtab"
    :class='{"collapsed" : store.state.app.detalleGedo_isCollapsed}'
    v-model:activeIndex="panelSelected"
    v-if="gedo_props"
    @click="store.dispatch('app/setDetalleGedo_isCollapsed_not')"
  >
    <TabPanel>
      <template #header>
        <i role="button" aria-label="Información" class="pi pi-info-circle p-mr-1" style="font-size:20px" v-tooltip.left="{ value: 'Información', disabled: !store.state.app.detalleGedo_isCollapsed }"></i>
      </template>
      <div class='p-col-fixed' v-if='!store.state.app.detalleGedo_isCollapsed'>
        <div class='p-col p-p-0'>
          <h6 style="margin-top:0.5rem">Información</h6>
          <div class="info" v-if='!curr_gedo.subsanado || (curr_gedo.subsanado && store.state.user.userData["username"] == store.state.gedo.curr_gedo.usuarioSubsanador)'>
            <h6 v-if='gedo_props.esReservado' class='p-text-uppercase' style="margin-top:0.5em">Reservado</h6>
            <CardField title='Número especial' :value="gedo_props.numeroEspecial"></CardField>
            <CardField title='Fecha de creación' v-if='gedo_props.fechaCreacion' :value="format(new Date(gedo_props.fechaCreacion),'dd/MM/yy HH:mm:ss')"></CardField>
            <CardField title='Descripción del tipo de documento' :value='gedo_props.tipoDocumento'></CardField>
            <CardField title='Repartición' :value='gedo_props.reparticion'></CardField>         
            <CardField title='Acto administrativo de reserva' :value='gedo_props.actoAdministrativoDeReserva'></CardField>
            <div v-if="gedo_props.listaUsuariosReservados && gedo_props.listaUsuariosReservados.length > 0">
              <Divider title='Usuarios Reservados'></Divider>
              <CardField
                v-for="usuarioReservado in gedo_props.listaUsuariosReservados"
                v-bind:key="usuarioReservado"
                :title="usuarioReservado.codigoEcosistema"
                :value="usuarioReservado.userName"
              ></CardField>
            </div>
          </div>       
        </div>
        <div v-if='curr_gedo.subsanado'>
          <CardField title='Persona subsanadora' :value='curr_gedo.usuarioSubsanador'></CardField>
          <CardField title='Fecha de Subsanación' :value="format(new Date(curr_gedo.fechaSubsanacion),'dd/MM/yy HH:mm:ss')"></CardField>
        </div>
      </div>
    </TabPanel>
    <TabPanel v-if='firmantes.length && (!curr_gedo.subsanado || (curr_gedo.subsanado && store.state.user.userData["username"] == store.state.gedo.curr_gedo.usuarioSubsanador))'>
      <template #header>
        <i role="button" aria-label="Firmantes" class="pi pi-user-edit p-mr-1" style="font-size:20px" v-tooltip.left="{ value: 'Firmantes', disabled: !store.state.app.detalleGedo_isCollapsed }"></i>
      </template>
      <div class="p-col-fixed" v-if="!store.state.app.detalleGedo_isCollapsed">
        <h6 style="margin-top: 0.5rem">Firmantes</h6>
        <CardField
          v-for="firmante in firmantes"
          :title="firmante.titulo"
          :value="firmante.nombre"
        ></CardField>
      </div>
    </TabPanel>
    <TabPanel v-if='gedo_props.listaHistorial && gedo_props.listaHistorial.length && (!curr_gedo.subsanado || (curr_gedo.subsanado && store.state.user.userData["username"] == store.state.gedo.curr_gedo.usuarioSubsanador))' >
      <template #header>
        <i role="button" aria-label="Historial de Confección" class="pi pi-clock p-mr-1" style="font-size:20px" v-tooltip.left="{ value: 'Historial', disabled: !store.state.app.detalleGedo_isCollapsed }"></i>
      </template>
      <div class="p-col-fixed" v-if="!store.state.app.detalleGedo_isCollapsed">
        <h6 style="margin-top: 0.5rem">Historial de Confección</h6>
        <Timeline :value="gedo_props.listaHistorial" style="margin-top: 1rem">
          <template #marker="slotProps">
            <span
              class="custom-marker p-shadow-2"
              :style="{
                backgroundColor: calcularTimelineIconColor(
                  slotProps.item.actividad
                ),
              }"
            >
              <i
                :class="'pi ' + calcularTimelineIcon(slotProps.item.actividad)"
              ></i>
            </span>
          </template>
          <template #content="slotProps">
            <div class="p-col p-p-0">
              <div class="p-text-bold" style="font-size: 14px">
                {{
                  format(new Date(slotProps.item.fechaFin), 'HH:mm:ss dd/MM/yy')
                }}
              </div>
              <div style="font-size: 14px">{{ slotProps.item.actividad }}</div>
              <div class="subtitle">
                {{ slotProps.item.userName }} ({{ slotProps.item.usuario }})
              </div>
              <div
                class="mensaje"
                style="margin-top: 0.25rem; margin-bottom: 1rem"
              >
                {{ slotProps.item.mensaje }}
              </div>
            </div>
          </template>
        </Timeline>
      </div>
    </TabPanel>
    <TabPanel v-if='gedo_props.listaArchivosDeTrabajo && gedo_props.listaArchivosDeTrabajo.length && (!curr_gedo.subsanado || (curr_gedo.subsanado && store.state.user.userData["username"] == store.state.gedo.curr_gedo.usuarioSubsanador))' >
      <template #header>
        <i role="button" aria-label="Archivos de trabajo" class="pi pi-paperclip p-mr-1" style="font-size:20px" v-tooltip.left="{ value: 'Archivos De Trabajo', disabled: !store.state.app.detalleGedo_isCollapsed }"></i>
      </template>
          <div class="p-col-fixed" id="scrollArchivos">
            <h6 style="margin-top: 0.5rem">Archivos de Trabajo</h6>
            <div class="p-grid" style="margin-top: 1rem; margin-left:0rem;margin-right:0rem;">
              <ScrollPanel class="custombar">
                <div class="archivoDeTrabajo" v-for="(archivo, index) in gedo_props.listaArchivosDeTrabajo">
                <Divider v-if='index > 0'/>
                <div style="margin-left:0rem;">
                  <div class="p-d-flex p-jc-between" style="margin-left:0rem;">
                    <div class="p-d-inline-flex" style="margin-left:0rem;">
                      <div class="p-as-center" style="margin-left:0rem;">
                        <div class='nombreArchivo' style="margin-left:0rem;">{{ archivo.nombreArchivo }}</div>
                          </div>
                        </div>
                        <div class="p-d-flex p-as-center">
                          <div class="p-as-center p-mr-2">
                            <Button
                              type="button"
                              icon="pi pi-download"
                              class="p-button-lg p-button-text"
                              style="p-p-4"
                              @click="descargaArchivoTrabajo(archivo)"
                              :aria-label="'Descargar archivo ' + archivo.nombreArchivo"
                            />
                          </div> 
                        </div>
                        </div>       
                      </div>
                    </div>
              </ScrollPanel>
            </div>
          </div>
    </TabPanel>
  </TabView>

<!--Boton descarga-->
  <div
    class="p-text-left btn_descarga_zip"
  >
    <Button
      @click="descargarDocumento"
      type="button"
      icon="pi pi-download"
      class="p-button-raised"
      :disabled="!gedo_props.puedeVerDocumento || (store.state.gedo.curr_gedo.subsanado && store.state.user.userData['username'] != store.state.gedo.curr_gedo.usuarioSubsanador)"
      v-tooltip.left="{ value: 'Descargar documento', disabled: !store.state.app.detalleGedo_isCollapsed }"
      aria-label="Descargar documento"
    />
    <label class='etiqueta derecha'>Descargar documento</label>
  </div>

<!--Colapsar-->
  <div
    class="p-text-left collapsableButton"
    @click="store.dispatch('app/toggleDetalleGedo_isCollapsed')"
  >
    <Button
      class="p-button-outlined p-button-secondary"
      v-tooltip.left="{ value: 'Expandir', disabled: !store.state.app.detalleGedo_isCollapsed }"
      :icon="
        'pi ' +
        (store.state.app.detalleGedo_isCollapsed
          ? 'pi-angle-double-left'
          : 'pi-angle-double-right')
      "
      :aria-label="store.state.app.detalleGedo_isCollapsed ? 'Expandir panel de detalles' : 'Colapsar panel de detalles'"
    />
    <label class='etiqueta derecha'>Colapsar</label>
  </div>

  <!--queda del desarrollo del panel derecho-->
  <div v-if="true">
    <Fieldset legend="app" :toggleable="true" :collapsed="true">
      <pre>{{ store.state.app }}</pre>
    </Fieldset>
    <Fieldset legend="ee" :toggleable="true" :collapsed="true">
      <pre>{{ store.state.ee }}</pre>
    </Fieldset>
    <Fieldset legend="gedo" :toggleable="true" :collapsed="true">
      <pre>{{ store.state.gedo }}</pre>
    </Fieldset>
    <Fieldset legend="user" :toggleable="true" :collapsed="true">
      <pre>{{ store.state.user }}</pre>
    </Fieldset>
  </div>
</template>

<script setup>
  import Button from 'primevue/button'

  import Fieldset from 'primevue/fieldset'
  import TabPanel from 'primevue/tabpanel'
  import TabView from 'primevue/tabview'
  import ScrollPanel from 'primevue/scrollpanel'
  import Divider from '../components/Divider.vue'
  import Timeline from 'primevue/timeline'
  import CardField from '../components/CardField.vue'

  import { download_base64 } from '../helpers/utils'
  import { archivoTrabajo } from '../api/gedo'

  import format from 'date-fns/format'
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const firmantes = computed(() => {
    if (store.state.gedo.detalle.listaFirmantes)
      return store.state.gedo.detalle.listaFirmantes.map(function (x) {
        return {
          titulo: x.substring(x.indexOf(' (')),
          nombre: x.substring(0, x.indexOf(' (')),
        }
      })
    return {}
  })

  let panelSelected = ref(0)
  const gedo_props = computed(() => {
    panelSelected.value = 0
    return store.state.gedo.detalle
  })

  async function descargaArchivoTrabajo(archivo) {
    let parms = {
      nombreArchivo: archivo.nombreArchivo,
      pathRelativo: archivo.pathRelativo,
      documentoId: store.state.gedo.curr_gedo.numeroSadeDocumento,
    }
    console.log(parms)
    let api_res = await archivoTrabajo(parms)
    if (api_res.error == false)
      download_base64(api_res.archivoTrabajoBase64, archivo.nombreArchivo)
  }

  // queda del desarrollo del panel derecho
  const curr_gedo = computed(() => store.state.gedo.curr_gedo)

  const timeLineValues = {
    'Iniciar Documento': {
      icon: 'pi-circle-off',
      color: '#607d8b',
    },
    'Confeccionar Documento': {
      icon: 'pi-pencil',
      color: '#5f92ccf3',
    },
    'Revisar Documento': {
      icon: 'pi-eye',
      color: '#ffa301',
    },
    'Revisar Documento con Firma Conjunta': {
      icon: 'pi-eye',
      color: '#ffa301',
    },
    'Firmar Documento': {
      icon: 'pi-check',
      color: '#34a835',
    },
    'Firmar Documento (Portafirma)': {
      icon: 'pi-check',
      color: '#34a835',
    },
    Rechazado: {
      icon: 'pi-times-circle',
      color: '#e93544',
    },
    default: {
      icon: 'pi-circle-off',
      color: '#5f92ccf3',
    },
  }

  function calcularTimelineIcon(actividad) {
    return timeLineValues[actividad]
      ? timeLineValues[actividad].icon
      : timeLineValues.default.icon
  }

  function calcularTimelineIconColor(actividad) {
    return timeLineValues[actividad]
      ? timeLineValues[actividad].color
      : timeLineValues.default.color
  }

  function descargarDocumento() {
    download_base64(store.state.gedo.pdf, store.state.gedo.curr_gedo.numeroSadeDocumento + '.pdf')
  }
</script>

<style lang="scss" scoped>

  .detalle-gedo {
    :not(&.collapsed) #scrollArchivos {
      width: 370px;
      transition-duration: 0.3s;
      transition-timing-function: ease-in;
      opacity: 1;
    }

    &.collapsed #scrollArchivos {
      transition-duration: 0s;
      opacity: 0;
      pointer-events: none;
    }
  }

  .cardField {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    font-family: 'Encode Sans', Helvetica, Arial, sans-serif;
  }
  .archivoDeTrabajo {
    .separator {
      width: 303px;
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .nombreArchivo {
      font-size: 14px;
      margin: 0rem;
      font-family: 'Encode Sans', Helvetica, Arial, sans-serif;
      margin-left: 2%;
      width: 240px;
      word-break: break-word;
    }
    button {
      margin-left: 2%;
      margin-top: 5px;
      margin-bottom: 5px;
      width: 96%;
    }
  }

  .custom-marker {
    display: flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border-radius: 50%;
    z-index: 1;
  }

  .collapsableButton, .btn_descarga_zip {
    padding-left: 23px;
  }

  .btn_descarga_zip {
    .p-button {
      background: #fc9569;
      border-color: #fc9569;
    }

    .p-button:hover {
      background: #df7142;
      border-color: #df7142;
    }
  }

  ::v-deep(.p-scrollpanel) {
    &.custombar {
      height: calc(70vh - 100px);
      .p-scrollpanel-bar {
        visibility: hidden;
        background-color: rgba(95, 146, 204, 0.4);
        opacity: 1;
        transition: background-color 0.2s;
        &:hover {
          background-color: rgba(95, 146, 204, 0.952);
        }
      } 
      &.custombar:hover .p-scrollpanel-bar-y{
          visibility: visible;
      }
    }
  }

</style>
<style lang='scss'>

  .p-tabview.collapsed ul {
    display: block;
    padding-left: 10px;

    li.p-highlight .p-tabview-nav-link {
      background-color: transparent;
      color: #333333;
      &:hover {
        background-color: #DBDBDB;
      }
    }
  }
</style>