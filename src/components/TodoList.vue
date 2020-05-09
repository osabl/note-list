<template>
  <ul v-if="todoList.length" class="todo-list">

    <TodoItem
      v-for="todoItem in todoList"
      :todo="todoItem"
      :key="todoItem.id"
      @remove-todo="removeTodo"
    />

  </ul>
  <p v-else>Todo list is empty!</p>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  components: {
    TodoItem
  },

  props: [
    'todoList'
  ],

  methods: {
    removeTodo (todo) {
      this.$emit('remove-todo', todo)
    }
  }
}
</script>
