import {createTask, deleteTask, getAllTasks, getTaskById} from "@/http/taskApi"

export default {
  state() {
    return {
      tasks: [],
      filterTasks: null
    }
  },
  getters: {
    tasks(state) {
       return state.tasks
    },
    filterTasks(state) {
      return state.filterTasks
    },
    taskById(_, getters) {
      return id => getters.tasks.find(t => t.id === id)
    },
    getActiveCounter(state) {
      return state.tasks.filter(task => task.status === 'active').length
    }
  },
  mutations: {
    createTask(state, task) {
      return state.tasks.push(task)
    },
    renderTasks(state, tasks) {
      state.tasks.length = 0
      return state.tasks.push(...Object.values(tasks))
    },
    deleteTask(state, id) {
      state.tasks.splice(id, 1)
    },
    deleteFilter(state) {
      return state.filterTasks = null
    },
    getFilterTasks(state, filterArray) {
      if (filterArray.length === 0) {
        return state.filterTasks = []
      }
      state.filterTasks = []
      return state.filterTasks.push(...filterArray)
    }
  },
  actions: {
    async createTask({ commit, rootState }, task) {
      try {
        const response = await createTask(task)
        if (!response) {
          throw new Error('Не удалось создать задачу, потоврите попытку позже')
        }
        task.id = response.name
        commit('createTask', task)
      } catch (e) {
        rootState.alert = {
          msg: e.message,
          isOpen: true,
          type: 'error'
        }
      }
    },
    async getTasks({ commit, rootState}) {
      try {
        const response = await getAllTasks()
        if (!response) return
        commit('renderTasks', response)
      } catch (e) {
        rootState.alert = {
          msg: e.message,
          isOpen: true,
          type: 'error'
        }
      }
    },
    async removeTask({ commit, rootState }, id) {
      try {
        await deleteTask(id)
        commit('deleteTask', id)
      } catch (e) {
        rootState.alert = {
          msg: e.message,
          isOpen: true,
          type: 'error'
        }
      }
    },
    async changeStatus({commit, rootState}, {id, task}) {
      try {
        const response = await getTaskById(id, task)
        if (!response) throw new Error('Что-то пошло не так')
        return response
      } catch (e) {
        rootState.alert = {
          msg: e.message,
          isOpen: true,
          type: 'error'
        }
      }
    }
  }
}
