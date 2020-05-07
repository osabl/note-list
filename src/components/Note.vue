<template>
  <div class="note">
    <h2>{{ clipboard.title }}</h2>
    <TodoAdd @add-todo="addTodo"/>
    <ul class="todo-list">
      <Todo v-for="todo in clipboard.list"
      :todo="todo"
      :key="todo.id"
      @remove-todo="removeTodo"
    /></ul>
  </div>
</template>

<script>
import TodoAdd from './TodoAdd.vue'
import Todo from './Todo.vue'

export default {
  data () {
    return {
      history: [JSON.parse(JSON.stringify(this.note))],
      clipboard: JSON.parse(JSON.stringify(this.note))
    }
  },
  watch: {
    clipboard: {
      handler () {
        this.history.push(JSON.parse(JSON.stringify(this.clipboard)))
      },
      deep: true
    }
  },
  props: ['note'],
  components: {
    TodoAdd,
    Todo
  },
  methods: {
    removeTodo (target) {
      this.clipboard.list = this.clipboard.list.filter(todo => todo.id !== target.id)
    },

    addTodo (todo) {
      this.clipboard.list.unshift(todo)
    }
  }
}
</script>
