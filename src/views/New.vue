<template>
  <form class="card" @submit.prevent="createNewTask">
    <h1>Создать новую задачу</h1>

    <div class="form-control">
      <label for="title">Название</label>
      <input
        type="text"
        id="title"
        v-model="nameTask"
      >
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input
        type="date"
        id="date"
        v-model="dateTask"
      >
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea
        id="description"
        v-model="textTask"
      ></textarea>
    </div>

    <button class="btn primary" :disabled="isValid">Создать</button>
  </form>

</template>

<script>
import {computed, ref} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import AppLoader from "@/components/AppLoader"

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const nameTask = ref('')
    const textTask = ref('')
    const dateTask = ref(null)




    const isValid = computed(() => {
      return !(dateTask.value && textTask.value && nameTask.value)
    })


    const createNewTask = async () => {
      store.commit('handlerLoading', true)
      await router.push('/')
      const newTask = {
        id: Date.now().toString(),
        name: nameTask.value,
        text: textTask.value,
        date: new Date(dateTask.value).setHours(23,59,59,999),
        status: 'active'
      }

      if (newTask.date < new Date()) {
        newTask.status = 'cancelled'
      }
      await store.dispatch('createTask', newTask)
      store.commit('handlerLoading', false)
      store.state.alert = {
        isOpen: true,
        msg: 'Успешно создано',
        type: 'success'
      }
      setTimeout(() => {
        store.state.alert = {
          isOpen: false,
          msg: 'Успешно создано',
          type: 'success'
        }
      }, 1000)
    }


    return {
      isValid,
      createNewTask,
      nameTask,
      dateTask,
      textTask
    }
  },
  components: {
    AppLoader
  }
}
</script>
