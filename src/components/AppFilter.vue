<template>
  <select class="select" @change="filterTypes">
    <option
      v-for="type in types"
      class="select__item"
      :value="type.type"
    >
      {{type.text}}
    </option>
  </select>
</template>

<script>
import {useStore} from "vuex"

export default {
  setup() {
    const store = useStore()
    const tasks = store.getters.tasks

    const types = [
      {
        type: 'all',
        text: 'Все'
      },
      {
        type: 'active',
        text: 'Активный'
      },
      {
        type: 'done',
        text: 'Выполнен'
      },
      {
        type: 'cancelled',
        text: 'Отменён'
      },
      {
        type: 'pending',
        text: 'Выполняется'
      }
    ]

    function filterTypes(e) {
      if (e.target.value === 'all') {
        return store.commit('deleteFilter')
      }
      const arr = tasks.filter(task => task.status === e.target.value)
      store.commit('getFilterTasks', arr)
    }

    return {
      types,
      filterTypes
    }
  }
}
</script>

<style>
.select {
  margin: 0 auto 10px;

  display: flex;
  justify-content: center;
}

.select__item,
.select {
  font-size: 24px;

  border-radius: 10px;
  padding: 5px 15px;
}

</style>
