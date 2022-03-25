<template>
  <Dialog
    :visible="store.state.app.dialog_text != null"
    :modal="true"
    :closable="false"
    :style="{ width: '50vw' }"
  >
    <div style="text-align: center">
      <p class="p-m-0">
        {{ store.state.app.dialog_text }}
      </p>
    </div>
    <template #footer>
      <Button label="OK" @click="store.dispatch('app/set_dialog_text', null)">
      </Button>
    </template>
  </Dialog>
  <encabezado></encabezado>
  <router-view/>
</template>

<script setup>
  import {
    computed,
    onMounted,
    ref,
    watch
  } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";

  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'

  import { renewAccessToken } from './api/user'
  import { get_url_params } from './helpers/utils'

  import encabezado from './layout/encabezado.vue'

  const store = useStore()
  const router = useRouter()

  let refreshTimeoutId = ref(null)

  let isLogged = computed(() => store.state.user.tokens)
  watch(isLogged, checkSessionStatus)

  function checkSessionStatus() {
    if (isLogged.value) {
      if (!refreshTimeoutId.value) {
        refreshToken()
        refreshTimeoutId.value = setInterval(refreshToken, 1000 * 60 * 4)
        router.push("/visor-ee")
      }
    }
    else {
      if (refreshTimeoutId.value) {
        clearInterval(refreshTimeoutId.value)
        refreshTimeoutId.value = null
      }
      router.push("/")
    }
  }

  async function refreshToken() {
    try {
      var res = await renewAccessToken()
      console.log('rt', new Date(), res)
      store.commit('user/SET_TOKENS', {
        accessToken: res.newAccessToken,
        refreshToken: store.state.user.tokens.refreshToken
      })
    } catch (error) {
        store.commit("app/SET_DIALOG_TEXT", 'Sesión expirada')
        store.commit("user/RESET_STATE")
    }
  }

  onMounted(() => {
    var params = get_url_params()
    console.log(
      "ee",
      params["ee"],
      "jwt",
      params["jwt"],
      "gedo",
      params["gedo"]
    )
    var ee = params['ee']
    var gedo = params['gedo']
    var jwt = params['jwt']

    if (gedo)
      store.commit('ee/SET_GEDO_NUM', gedo)
    if (ee) {
      ee = decodeURIComponent(ee).replaceAll('+', ' ')
      store.commit('ee/SET_EE_NUM', ee)
    }
    if (jwt) {
      try {
        var tokenObj = JSON.parse(atob(jwt))
        store.commit('user/SET_TOKENS', {
          accessToken: tokenObj.accessToken,
          refreshToken: tokenObj.refreshToken
        })
      } catch(error) {
        store.commit("app/SET_DIALOG_TEXT", "Token Inválido")
      }
    }
  })

</script>
