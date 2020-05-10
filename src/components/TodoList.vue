<template>
  <ul v-if="todoList.length" class="todo__list">

    <TodoItem ref="input"
      v-for="todoItem in todoList"
      :todo="todoItem"
      :key="todoItem.id"
      @remove-todo="removeTodo"
    />

  </ul>
  <p v-else class="empty">Todo list is empty!</p>
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

<style scoped>
  .todo__list {
    padding-left: 0;
  }

  .empty {
    text-align: center;
  }
</style>
