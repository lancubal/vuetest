import { gedo_detalle as api_gedo_detalle, gedo_pdf as api_gedo_pdf } from "../../api/gedo.js"
import format from "date-fns/format"
import error_translation_rules from "../../helpers/error_translation_rules"
import axios from "axios"
const getDefaultState = () => {
  return {
    curr_gedo: {},
    gedo_num: "",
    detalle: {},
    pdf: "",
    trayendo_gedo: true,
  }
}
let cache_detalle = {}
let cache_pdf = {}

const state = getDefaultState()
const getters = (state) => {

  curr_gedo: state => curr_gedo
  gedo_num: state => gedo_num
  detalle: state => detalle
  pdf: state => pdf
  trayendo_gedo: state => trayendo_gedo

}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_GEDO_NUM: (state, gedo_num) => {
    state.gedo_num = gedo_num
  },

  SET_DETALLE: (state, detalle) => {
    state.detalle = detalle
  },
  SET_PDF: (state, pdf) => {
    state.pdf = pdf
  },
  SET_CURR_GEDO_VINCULADO: (state, gedo) => {
    state.curr_gedo = gedo
  },
  SET_TRAYENDO_GEDO: (state, trayendo_gedo) => {
    state.trayendo_gedo = trayendo_gedo
  },

}
const actions = {
  set_curr_gedo_vinculado({ commit, rooState }, gedo) {
    commit("SET_CURR_GEDO_VINCULADO", gedo)
  },
  async traer_detalle({ commit, rootState }, gedo_num) {
    if (!cache_detalle[gedo_num]) {
      try {
        cache_detalle[gedo_num] = await api_gedo_detalle({ documento: gedo_num }, rootState.user.tokens.accessToken)
      } catch (error) {
        console.log("catch error detalle", error)
        cache_detalle[gedo_num] = {}
      }
    }
    console.log("detalle GEDO", cache_detalle[gedo_num])
    commit("SET_DETALLE", cache_detalle[gedo_num])
  },
  async traer_pdf({ commit, rootState }, gedo_num) {
    if (!cache_pdf[gedo_num]) {
      try {
        cache_pdf[gedo_num] = await api_gedo_pdf({ documento: gedo_num }, rootState.user.tokens.accessToken)
      } catch (error) {
        console.log("catch error pdf", error)
      }
    }
    commit("SET_PDF", cache_pdf[gedo_num])
  },
  async traer_pdf_reservado({ commit, rootState }) {
    let response = await axios.get("/PDFreservado.pdf", { responseType: "arraybuffer" })

    const binaryString = Array.from(new Uint8Array(response.data), v => String.fromCharCode(v)).join("");
    var pdf = btoa(binaryString)
    commit("SET_PDF", pdf)

  },
  async traer_pdf_subsanado({ commit, rootState }) {
    let response = await axios.get("/PDFsubsanado.pdf", { responseType: "arraybuffer" })

    const binaryString = Array.from(new Uint8Array(response.data), v => String.fromCharCode(v)).join("");
    var pdf = btoa(binaryString)
    commit("SET_PDF", pdf)

  }

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
