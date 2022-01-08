<template>
  <h1 class="text-white center" v-if="!tasks.length && !isLoading">Задач нет</h1>
  <div class="mc">
    <AppLoader v-if="isLoading"/>
  </div>
  <div v-if="isLoading === false && tasks.length">
    <h3 class="text-white">Всего активных задач: {{ activeCounter }}</h3>
    <AppFilter />
    <tasks-element
      v-if="!filterTasks"
      v-for="task in tasks"
      :date="task.date"
      :status="task.status"
      :id="task.id"
      :key="task.id"
      :name="task.name"
    >
    </tasks-element>

    <tasks-element
      v-else-if="filterTasks?.length > 0"
      v-for="task in filterTasks"
      :date="task.date"
      :status="task.status"
      :id="task.id"
      :key="task.id"
      :name="task.name"
    >
    </tasks-element>

    <div v-else class="mc">
      <h1 class="white-text">Ничего не найдено</h1>
    </div>


  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader"
import AppFilter from "@/components/AppFilter"
import TasksElement from "@/components/TasksElement"
import {useStore} from "vuex"
import {computed, onMounted} from "vue"

export default {
  setup() {
    const store = useStore()

    const tasks = computed(() => {
      return store.getters.tasks
    })

    const activeCounter = computed(() => {
      return store.getters.getActiveCounter
    })

    const isLoading = computed(() => {
      return store.getters.getLoading
    })

    const filterTasks = computed(() => {
      return store.getters.filterTasks
    })

    onMounted(() => {
      getTasks()
    })

    const getTasks = async () => {
      try {
        store.commit('handlerLoading', true)
        await store.dispatch('getTasks')
      } finally {
        store.commit('handlerLoading', false)
      }
    }

    return {
      store,
      tasks,
      isLoading,
      activeCounter,
      filterTasks
    }
  },
  components: {
    AppLoader,
    TasksElement,
    AppFilter
  }
}
</script>

<style scoped>
.mc {
  display: flex;
  justify-content: center;
}

.white-text {
  color: #fff;
}
</style>
