<template>
  <form @submit.prevent="addTodo">

    <input type="text" v-model="title">
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
      const title = this.title.trim()

      if (title) {
        const todo = {
          id: Date.now(),
          title: title,
          completed: false
        }

        this.title = ''
        this.$emit('add-todo', todo)
      }
    }
  }
}
</script>
