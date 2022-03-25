import Vue from 'vue'
import { createStore } from 'vuex'

const createVuexStore = (initialState = {}) => createStore({
    state() {
        return {
            app: {
                dialog_text: null,
                gedos_isCollapsed: false,
                detalleGedo_isCollapsed: false
            },
            ee: {
                get_gedo_by_index: (index) => {
                    return state.documentos_vinculados[index]
                },
                gedo_num: "",
                ee_num: "",
                detalle: {},
                historial: {},
                documentos_vinculados: []
            },
            gedo: {
                curr_gedo: {},
                gedo_num: "",
                detalle: {},
                pdf: "",
                trayendo_gedo: true,
            },
            user: {
                tokenValido: true,
                tokens: null,
                nombre: '',
                userData: {},
            },
            ...initialState,
        }
    },
})

export { createVuexStore }