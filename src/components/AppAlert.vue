<template>
  <div class="alert" :class="choiceType">
    <p>{{ msg }}</p>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'error'
    },
    msg: {
      type: String,
      required: false,
      default: 'Ошибка'
    }
  },
  computed: {
    choiceType() {
      return this.type === 'error' ? 'danger' : 'primary'
    }
  }
}
</script>

<style>

</style>
