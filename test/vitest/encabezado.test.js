import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest';
import { createVuexStore } from '../../src/createStore';
import { createVueRouter } from '../../src/createRouter';
import Tooltip from 'primevue/tooltip';
import Encabezado from '../../src/layout/encabezado.vue'

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

let user = {
  tokenValido: true,
  tokens: {
    accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2NDczNjYyMTgsImdkZS1hY2Nlc3NUb2tlbiI6eyJwbGF0Zm9ybUxldmVsIjoiMSIsInNlY0xldmVsRGVzYyI6ImdkZSIsImpzb25LZXkiOiJnZGUtYWNjZXNzVG9rZW4iLCJ1c2VyIjp7InR5cGUiOiJGIiwidXNlcm5hbWUiOiJJUkFNSVJFWiIsInJlcGFydGljaW9uIjoiRE5HREUjSkdNIiwic2VjdG9yIjoiUFZEIiwianVyaXNkaWNjaW9uIjoiU3Vic2VjcmV0YXLDrWEgZGUgR2VzdGnDs24gQWRtaW5pc3RyYXRpdmEiLCJjdWl0IjoiMjAzODIwMjIzNjAiLCJzaG9ydEZ1bGxOYW1lIjoiSWduYWNpbyBSYW1pcmV6IiwiZmlyc3RuYW1lMSI6IklnbmFjaW8iLCJsYXN0bmFtZTEiOiJSYW1pcmV6IiwiZW1haWwiOiJpcmFtaXJlekBtb2Rlcm5pemFjaW9uLmdvYi5hciJ9LCJpZEF1dGgiOiJkNDE4YzJiOC1kYjllLTQxNjQtOGRkZS1lMjE1ZjRiN2IxZTkifSwiaXNzIjoic2VjdXJpdHkuZ2RlLmdvYi5hciIsInByb3ZpZGVyIjoiUkVGUkVTSEVEIn0.BqcxzhNGEwaZhUmrMumA9BfVp94jkg5QYUL6pnVJJ9u40bbbxsHUSyt8ZybGaLqjJxMX6NODnQ8bTzfigEvYYDl6xoWM73ia_llzClzhVOGeMJUshwz3a-N27cJg8nRRPlHrslJ3w93dYhkYL31yxSUn56cDYOYYR6tmz_YOtvxk3_JguNNHKVpDLg9eVJa3dYSbyPXVken5kAGN1-xXVjj7QKiuAoEQhcWc3m9XXdgMHiL5iVyArvmH-kRdkBH6ST1DxUrlBVFan_5WUKzbukfVzfLjZng8IcTd-gEXJR_WnZUJJ3Q9mh7MkSgeONNUTQYvM03_ZD2fcDx6yXNG9A",
    refreshToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnZGUtcmVmcmVzaFRva2VuIjp7InBsYXRmb3JtTGV2ZWwiOiIxIiwic2VjTGV2ZWxEZXNjIjoiZ2RlIiwianNvbktleSI6ImdkZS1yZWZyZXNoVG9rZW4iLCJpZEF1dGgiOiI5ZTgyZTc5MC02MWNiLTQ1NDMtYjcyNC01MDZhYzRiNDE3NWEifX0.DBgBb7lzbd7ErRo517iY-k0M76jNYpmtwWpMWyLxybciyOsg8Z79HCIfMlRiwDVSYa9Gj4iGXLDknB6lf-WjhnvkGgkTeTbEn67feXnAQNziuBz63INoMckZHJj6ESIN2xIwl8te9cLS4FpVmkZEkmo965nPmnmmApCcOLTVuc_QSnnZQpHN5B8Gg-VxT_ryhffurUgE3SMblG1Q83ShyeZhpUgtdalS_T3oLYrsfaYJfxj4SDYnYcgMyTSlsLbV9Ccopo8khlOXKpwCxKMgyouNDKa04A1mrtp5gleCgtkXKNqtUGhQCC3UEiXxMgewxbMIJmvC40n52iO2DEqEgw"
  },
  nombre: "",
  userData: {
    type: "F",
    username: "IRAMIREZ",
    reparticion: "DNGDE#JGM",
    sector: "PVD",
    jurisdiccion: "Subsecretaría de Gestión Administrativa",
    cuit: "20382022360",
    shortFullName: "Ignacio Ramirez",
    firstname1: "Ignacio",
    lastname1: "Ramirez",
    email: "iramirez@modernizacion.gob.ar"
  }
}

describe("encabezado.vue", () => {
  test('1.Log out', async() => {

    const store = createVuexStore({ ee,user })
    store.dispatch = vi.fn()
    store.commit = vi.fn()


    const wrapper = mount(Encabezado, {
      global: {
        plugins: [store],
        directives: {
          tooltip: Tooltip
        }
      }
    })

    wrapper.find('.log-out').trigger('click')
    await wrapper.vm.$nextTick()

    await expect(store.dispatch).toHaveBeenCalledWith('user/logout')
    await expect(store.commit).toHaveBeenCalledWith('ee/RESET_STATE')
    await expect(store.commit).toHaveBeenCalledWith('gedo/RESET_STATE')
    await expect(store.commit).toHaveBeenCalledWith('user/RESET_STATE')

  })
  test('2. Busqueda', async() => {
    const store = createVuexStore({ ee,user })
    store.dispatch = vi.fn()

    const wrapper = mount(Encabezado, {
      global: {
        plugins: [store],
        directives: {
          tooltip: Tooltip
        }
      }
    })

    await wrapper.find('.p-inputtext').setValue('testEE')
    await wrapper.vm.$nextTick()
    await wrapper.find('.pi-search').trigger('click')
    await wrapper.vm.$nextTick()

    await expect(store.dispatch).toHaveBeenCalledWith("ee/traer_ee","testEE")
  })
  test('3. Informacion', async() => {
    const wrapper = createWrapper(Encabezado,{},{ee,user})

    expect(wrapper.text()).toContain(ee.ee_num)
    expect(wrapper.text()).toContain(ee.historial.estado)
    expect(wrapper.text()).toContain(user.userData["username"])
  })
})
