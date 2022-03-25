
const getDefaultState = () => {
  return {

    dialog_text: null,
    gedos_isCollapsed: false,
    detalleGedo_isCollapsed: false
  }
}

const state = getDefaultState()
const getters = (state) => {
  dialog_text: state => dialog_text
  gedos_isCollapsed: state => gedos_isCollapsed
  detalleGedo_isCollapsed: state => detalleGedo_isCollapsed
}

const mutations = {

  SET_DIALOG_TEXT: (state, text) => {
    state.dialog_text = text
  },
  SET_GEDOS_COLLAPSED: (state, value) => {
    state.gedos_isCollapsed = value
  },
  SET_DETALLEGEDO_COLLAPSED: (state, value) => {
    state.detalleGedo_isCollapsed = value
  }
}
const actions = {
  set_dialog_text(context, texto) {
    context.commit("SET_DIALOG_TEXT", texto)
  },

  toggleGedos_isCollapsed(context) {
    context.commit("SET_GEDOS_COLLAPSED", !context.state.gedos_isCollapsed)
  },

  toggleDetalleGedo_isCollapsed(context) {
    context.commit("SET_DETALLEGEDO_COLLAPSED", !context.state.detalleGedo_isCollapsed)
  },

  setDetalleGedo_isCollapsed_not(context) {
    context.commit("SET_DETALLEGEDO_COLLAPSED", false)
  }

}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}