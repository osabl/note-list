<template>
  <ul class="todo-list">
    <TodoItem v-for="todoItem in todoList"
      :todo="todoItem"
      :key="todoItem.id"
      @remove-todo="removeTodo"
    />
  </ul>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  props: [
    'todoList'
  ],
  components: {
    TodoItem
  },
  methods: {
    removeTodo (todo) {
      this.$emit('remove-todo', todo)
    }
  }
}
</script>
