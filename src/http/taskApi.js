import {$host} from "@/http/index"

export const getAllTasks = async () => {
  const {data} = await $host.get('/tasks.json')
  if (data) {
     const arr = Object.keys(data)
     Object.values(data).map((el, i) => {
       el.id = arr[i]
    })
  }
  return data
}

export const createTask = async (task) => {
  const {data} = await $host.post('/tasks.json', {...task})
  return data
}

export const deleteTask = async (id) => {
  const {data} = await $host.delete(`/tasks/${id}.json`)
  return data
}

export const getTaskById = async (id, task) => {
  const {data} = await $host.put(`/tasks/${id}.json`, {...task})
  return data
}
