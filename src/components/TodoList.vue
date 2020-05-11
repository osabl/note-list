<template>
  <transition name="fade" mode="out-in">
    <div v-if="todoList.length" :key="'list-wrapper'">
      <transition-group  class="todo__list" name="todo__list">

        <TodoItem ref="input"
          v-for="todoItem in todoList"
          :todo="todoItem"
          :key="todoItem.id"
          @remove-todo="removeTodo"
        />

      </transition-group>
    </div>
    <p v-else class="empty" :key="'empty'">Список задач пуст.</p>
  </transition>
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

  .todo__list-move {
    transition: transform 0.2s;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .empty {
    text-align: center;
    margin: 12px;
  }
</style>
