<template>
  <h3 class="text-white center" v-if="!task">
    {{ toMain() }}
  </h3>
  <div class="card" v-else>
    <h2>{{ task.name }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" :classes="classes"/></p>
    <p ><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.text }}</p>
    <div>
      <button class="btn" @click="updateStatus('active')" :disabled="isDisabled">Взять в работу</button>
      <button class="btn primary" @click="updateStatus('done')" :disabled="isDisabled">Завершить</button>
      <button class="btn danger" @click="updateStatus('cancelled')" :disabled="isDisabled">Отменить</button>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {computed, ref} from "vue"

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isDisabled = ref(false)
    const paramsId = router.currentRoute.value.params.id
    const classes = ref('')

    const task = computed(() => {
      return store.getters.taskById(paramsId)
    })

    const toMain = () => {
      router.push('/')
    }

    const updateStatus = async (status) => {
      classes.value = 'new'
      task.value.status = status
      isDisabled.value = true
      const response = await store.dispatch('changeStatus', { id: paramsId, task: task.value })
      if (!response) return
      await router.push('/')
      store.state.alert = {
        isOpen: true,
        msg: 'Статус изменён',
        type: 'success'
      }
      setTimeout(() => {
        store.state.alert = {
          isOpen: false,
          msg: 'Статус изменён',
          type: 'success'
        }
      }, 1000)
      isDisabled.value = false
      classes.value = ''
    }
    return {
      store,
      task,
      paramsId,
      updateStatus,
      isDisabled,
      toMain,
      classes
    }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>
