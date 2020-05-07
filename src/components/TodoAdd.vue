<template>
  <form @submit.prevent="addTodo">
    <input
    type="text"
    v-model="title">
    <button type="submit">+</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTodo () {
      if (this.title.trim()) {
        const todo = {
          id: Date.now(),
          title: this.title,
          completed: false
        }

        this.$emit('add-todo', todo)
        this.title = ''
      }
    }
  }
}
</script>
