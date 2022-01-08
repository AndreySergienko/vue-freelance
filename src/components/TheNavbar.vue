<template>
  <nav class="navbar">
    <h3>
      Freelance
    </h3>

    <ul class="navbar-menu">
      <li>
        <router-link :to="{name: 'Main'}" @click="closeAlert">Все задачи</router-link>
      </li>
      <li>
        <router-link :to="{name: 'New'}" @click="closeAlert">Создать</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useStore} from "vuex"

export default {
  setup() {
    const store = useStore()

    const closeAlert = () => {
      return store.state.alert = {
        isOpen: false,
      }
    }

    return {
      closeAlert
    }
  }
}
</script>

<style scoped>

</style>
