<template>
  <div class="card">
    <h2 class="card-title">
      {{ name }}
      <AppStatus :type="status" />
    </h2>
    <p>
      <strong>
        <small>
          {{new Date(date).toLocaleDateString()}}
        </small>
      </strong>
    </p>
    <button class="btn primary" @click="linkTask">Посмотреть</button>
    <button class="btn danger" @click="removeElement" :disabled="isDisabled">Удалить</button>
  </div>
</template>

<script>
import AppStatus from './AppStatus'
import {useStore} from "vuex"
import {deleteTask} from "@/http/taskApi"
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    date: {
      type: [String, Date, Number],
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const isDisabled = ref(false)

    const removeElement = async () => {
      isDisabled.value = true
      await store.dispatch('removeTask', props.id)
    }
    const linkTask = () => {
      router.push(`/task/${props.id}`)
    }

    return {
      removeElement,
      isDisabled,
      linkTask
    }
  },
  components: {
    AppStatus
  }
}
</script>

<style></style>
