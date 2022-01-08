<template>
  <span class="badge" :class="classes">{{ renderStatusText }}</span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      validator(value) {
        return ['active', 'pending', 'cancelled', 'done'].includes(value)
      }
    },
    classes: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    renderStatusText() {
      switch (this.type) {
        case 'active':
          return 'Активный'
        case 'pending':
          return 'Выполняется'
        case 'cancelled':
          return 'Отменён'
        case 'done':
          return 'Выполнен'
      }
    }
  }
}
</script>
