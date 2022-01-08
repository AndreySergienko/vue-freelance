<template>
  <the-navbar></the-navbar>

  <div class="container with-nav">
    <transition name="alert-effect">
      <AppAlert
        v-if="isAlert"
        :msg="alertMsg"
        :type="alertType"
        @click="closeAlert"
      />
    </transition>
  </div>

  <div class="container with-nav">
    <router-view></router-view>
  </div>

</template>

<script>
import TheNavbar from './components/TheNavbar'
import AppAlert from "@/components/AppAlert"
import {useStore} from "vuex"
import {computed} from "vue"

export default {
  setup() {
    const store = useStore()

    const isAlert = computed(() => {
      return store.state.alert.isOpen
    })

    const alertType = computed(() => {
      return store.state.alert.type
    })

    const alertMsg = computed(() => {
      return store.state.alert.msg
    })

    const closeAlert = () => {
      return store.state.alert.isOpen = false
    }

    return {
      store,
      isAlert,
      alertMsg,
      alertType,
      closeAlert
    }
  },
  components: {
    TheNavbar,
    AppAlert
  }
}
</script>

<style scoped>
  .alert-effect-enter-active {
    transition: all 0.3s ease-out;
  }

  .alert-effect-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .alert-effect-enter-from,
  .alert-effect-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
