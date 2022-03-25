import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest';
import GedosDescarga from '../../src/layout/gedosDescarga.vue'
import { createVuexStore } from '../../src/createStore';
import { createVueRouter } from '../../src/createRouter';
import Tooltip from 'primevue/tooltip';

const createWrapper = (component, options = {}, storeState = {}) => {
  const store = createVuexStore(storeState)
  const router = createVueRouter()

  return mount(component, {
    global: {
      plugins: [
        store
      ],
      directives: {
        tooltip: Tooltip
      }
    },
    ...options
  })
}

let ee = {
  documentos_vinculados: [
    {
      numeroSadeDocumento: "PV-2021-00003664-DEVVM-DNGDE#JGM",
      numeroEspecialDocumento: null,
      fechavinculacionDefinitiva: 1622649395488,
      usuarioAsociacion: "LNANTON",
      tipodeDocumento: "PV",
      referencia: "Pase",
      fechaCreacion: 1622649395000,
      usuarioGenerador: "LNANTON",
      subsanado: false,
      usuarioSubsanador: null,
      fechaSubsanacion: null,
      definitivo: true,
      fecha_asociacion: "2021-06-02 12:56:35",
      orden: 28,
      searchable: "29PV-2021-00003664-DEVVM-DNGDE#JGMPVPASE2021-06-02 12:56:35"
    },
    {
      numeroSadeDocumento: "IF-2021-00003663-DEVVM-DNGDE#JGM",
      numeroEspecialDocumento: null,
      fechavinculacionDefinitiva: 1622649366297,
      usuarioAsociacion: "LNANTON",
      tipodeDocumento: "IF",
      referencia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu orci luctus, sollicitudin metus a, egestas mi. Vivamus sapien dui, dignissim eget tincidunt sit amet, posuere sed nulla. In nec lacus eget tortor efficitur sodales nec euismod lorem. In",
      fechaCreacion: 1622649293000,
      usuarioGenerador: "LNANTON",
      subsanado: false,
      usuarioSubsanador: null,
      fechaSubsanacion: null,
      definitivo: true,
      fecha_asociacion: "2021-06-02 12:56:06",
      orden: 27,
      searchable: "28IF-2021-00003663-DEVVM-DNGDE#JGMIFLOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NUNC EU ORCI LUCTUS, SOLLICITUDIN METUS A, EGESTAS MI. VIVAMUS SAPIEN DUI, DIGNISSIM EGET TINCIDUNT SIT AMET, POSUERE SED NULLA. IN NEC LACUS EGET TORTOR EFFICITUR SODALES NEC EUISMOD LOREM. IN2021-06-02 12:56:06"
    },
    {
      numeroSadeDocumento: "IF-2021-00003547-DEVVM-DNGDE#JGM",
      numeroEspecialDocumento: null,
      fechavinculacionDefinitiva: 1621438094836,
      usuarioAsociacion: "LNANTON",
      tipodeDocumento: "IF",
      referencia: "Test 20 archivos de trabajo",
      fechaCreacion: 1621434453000,
      usuarioGenerador: "IRAMIREZ",
      subsanado: false,
      usuarioSubsanador: null,
      fechaSubsanacion: null,
      definitivo: true,
      fecha_asociacion: "2021-05-19 12:28:14",
      orden: 26,
      searchable: "27IF-2021-00003547-DEVVM-DNGDE#JGMIFTEST 20 ARCHIVOS DE TRABAJO2021-05-19 12:28:14"
    }
  ],
  gedo_num: "PV-2021-00003664-DEVVM-DNGDE#JGM",
  ee_num: "EX-2021-00003559-   -DEVVM-PTE",
  detalle: {},
  historial: {
    documentosVinculados: [
      {
        numeroSadeDocumento: "PV-2021-00003664-DEVVM-DNGDE#JGM",
        numeroEspecialDocumento: null,
        fechavinculacionDefinitiva: 1622649395488,
        usuarioAsociacion: "LNANTON",
        tipodeDocumento: "PV",
        referencia: "Pase",
        fechaCreacion: 1622649395000,
        usuarioGenerador: "LNANTON",
        subsanado: false,
        usuarioSubsanador: null,
        fechaSubsanacion: null,
        definitivo: true,
        fecha_asociacion: "2021-06-02 12:56:35",
        orden: 28,
        searchable: "29PV-2021-00003664-DEVVM-DNGDE#JGMPVPASE2021-06-02 12:56:35"
      },
      {
        numeroSadeDocumento: "IF-2021-00003663-DEVVM-DNGDE#JGM",
        numeroEspecialDocumento: null,
        fechavinculacionDefinitiva: 1622649366297,
        usuarioAsociacion: "LNANTON",
        tipodeDocumento: "IF",
        referencia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu orci luctus, sollicitudin metus a, egestas mi. Vivamus sapien dui, dignissim eget tincidunt sit amet, posuere sed nulla. In nec lacus eget tortor efficitur sodales nec euismod lorem. In",
        fechaCreacion: 1622649293000,
        usuarioGenerador: "LNANTON",
        subsanado: false,
        usuarioSubsanador: null,
        fechaSubsanacion: null,
        definitivo: true,
        fecha_asociacion: "2021-06-02 12:56:06",
        orden: 27,
        searchable: "28IF-2021-00003663-DEVVM-DNGDE#JGMIFLOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NUNC EU ORCI LUCTUS, SOLLICITUDIN METUS A, EGESTAS MI. VIVAMUS SAPIEN DUI, DIGNISSIM EGET TINCIDUNT SIT AMET, POSUERE SED NULLA. IN NEC LACUS EGET TORTOR EFFICITUR SODALES NEC EUISMOD LOREM. IN2021-06-02 12:56:06"
      },
      {
        numeroSadeDocumento: "IF-2021-00003547-DEVVM-DNGDE#JGM",
        numeroEspecialDocumento: null,
        fechavinculacionDefinitiva: 1621438094836,
        usuarioAsociacion: "LNANTON",
        tipodeDocumento: "IF",
        referencia: "Test 20 archivos de trabajo",
        fechaCreacion: 1621434453000,
        usuarioGenerador: "IRAMIREZ",
        subsanado: false,
        usuarioSubsanador: null,
        fechaSubsanacion: null,
        definitivo: true,
        fecha_asociacion: "2021-05-19 12:28:14",
        orden: 26,
        searchable: "27IF-2021-00003547-DEVVM-DNGDE#JGMIFTEST 20 ARCHIVOS DE TRABAJO2021-05-19 12:28:14"
      }
    ],
    expedientesAsociados: [],
    expedientesFusionAsociados: [],
    expedientesVinculados: [],
    historialDeOperacion: [
      {
        tipoOperacion: "Pase",
        fechaOperacion: 1622649395000,
        usuario: "LNANTON",
        expediente: "EX20213559DEVVM-PTE",
        idExpediente: 1049158,
        motivo: "test",
        destinatario: "LNANTON",
        estado: "Tramitación",
        origenPaseCodigoReparticion: "DNGDE#JGM",
        origenPaseDescripcionReparticion: "Dirección General de Asuntos Jurídicos",
        destinoPaseCodigoReparticion: "DNGDE#JGM",
        destinoPaseDescripcionReparticion: "Dirección General de Asuntos Jurídicos",
        origenPaseCodigoSector: "PVD2",
        origenPaseDescripcionSector: "Privada Dos",
        destinoPaseCodigoSector: "PVD2",
        destinoPaseDescripcionSector: "Privada Dos"
      },
      {
        tipoOperacion: "Cambio Estado",
        fechaOperacion: 1621438107000,
        usuario: "LNANTON",
        expediente: "EX20213559DEVVM-PTE",
        idExpediente: 1049158,
        motivo: "Cambio de Estado sin Pase",
        destinatario: "LNANTON",
        estado: "Tramitación",
        origenPaseCodigoReparticion: "PTE",
        origenPaseDescripcionReparticion: null,
        destinoPaseCodigoReparticion: "PTE",
        destinoPaseDescripcionReparticion: "Presidencia de la NacIón",
        origenPaseCodigoSector: "PVD",
        origenPaseDescripcionSector: null,
        destinoPaseCodigoSector: "PVD",
        destinoPaseDescripcionSector: "Privada"
      },
      {
        tipoOperacion: "Pase",
        fechaOperacion: 1621437233000,
        usuario: "LNANTON",
        expediente: "EX20213559DEVVM-PTE",
        idExpediente: 1049158,
        motivo: "Prueba",
        destinatario: "LNANTON",
        estado: "Iniciación",
        origenPaseCodigoReparticion: "PTE",
        origenPaseDescripcionReparticion: "Presidencia de la NacIón",
        destinoPaseCodigoReparticion: "PTE",
        destinoPaseDescripcionReparticion: "Presidencia de la NacIón",
        origenPaseCodigoSector: "PVD",
        origenPaseDescripcionSector: "Privada",
        destinoPaseCodigoSector: "PVD",
        destinoPaseDescripcionSector: "Privada"
      },
      {
        tipoOperacion: "Pase",
        fechaOperacion: 1621436483000,
        usuario: "LNANTON",
        expediente: "EX20213559DEVVM-PTE",
        idExpediente: 1049158,
        motivo: "IF-2021-00003561-DEVVM-DEVVMQC#1",
        destinatario: "LNANTON",
        estado: "Iniciación",
        origenPaseCodigoReparticion: "PTE",
        origenPaseDescripcionReparticion: "Presidencia de la NacIón",
        destinoPaseCodigoReparticion: "PTE",
        destinoPaseDescripcionReparticion: "Presidencia de la NacIón",
        origenPaseCodigoSector: "PVD",
        origenPaseDescripcionSector: "Privada",
        destinoPaseCodigoSector: "PVD",
        destinoPaseDescripcionSector: "Privada"
      },
      {
        tipoOperacion: "Pase",
        fechaOperacion: 1621436206000,
        usuario: "LNANTON",
        expediente: "EX20213559DEVVM-PTE",
        idExpediente: 1049158,
        motivo: "EX-2021-00003555- -DEVVM-PTE",
        destinatario: "LNANTON",
        estado: "Iniciación",
        origenPaseCodigoReparticion: "PTE",
        origenPaseDescripcionReparticion: null,
        destinoPaseCodigoReparticion: "PTE",
        destinoPaseDescripcionReparticion: null,
        origenPaseCodigoSector: "PVD",
        origenPaseDescripcionSector: null,
        destinoPaseCodigoSector: null,
        destinoPaseDescripcionSector: null
      }
    ],
    estado: "Tramitación"
  }
}


describe("gedosDescarga.vue", () => {
  test.only('1. Validar dialogos', async () => {
    let flags = {}
    let zip_results = {}

    const wrapper = createWrapper(GedosDescarga, { flags, zip_results }, { ee })
  })
  test('2. Documentos', async () => {
    let flags = {}
    let zip_results = {}

    const wrapper = createWrapper(GedosDescarga, { flags, zip_results }, { ee })
  })
  test('3. Descarga', async () => {
    let flags = {}
    let zip_results = {}

    const wrapper = createWrapper(GedosDescarga, { flags, zip_results }, { ee })
  })
})
