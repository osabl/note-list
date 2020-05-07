<template>
  <div class="note">
    <div class="actions">
      <button @click="undoChange">undo</button>
      <button @click="redoChange">redo</button>
      <button @click="reset">cancel</button>
      <button @click="saveChange">save</button>
    </div>
    <h2>{{ current.title }}</h2>

    <TodoAdd @add-todo="addTodo"/>

    <ul class="todo-list">
      <Todo v-for="todo in current.list"
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
      index: 0,
      history: [JSON.stringify(this.note)],
      current: JSON.parse(JSON.stringify(this.note)),
      lock: false
    }
  },
  watch: {
    current: {
      handler () {
        if (this.lock) {
          this.lock = false
          return
        }

        // trim array
        if (this.history.length > this.index++) {
          this.history.length = this.index
        }

        this.history.push(JSON.stringify(this.current))
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
      this.current.list = this.current.list.filter(todo => todo.id !== target.id)
    },

    addTodo (todo) {
      this.current.list.unshift(todo)
    },

    undoChange () {
      if (this.index > 0) {
        this.lock = true
        this.index--
        this.current = JSON.parse(this.history[this.index])
      }
    },

    redoChange () {
      if (this.index + 1 < this.history.length) {
        this.lock = true
        this.index++
        this.current = JSON.parse(this.history[this.index])
      }
    },

    reset () {
      this.lock = true
      this.index = 0
      this.history = [JSON.stringify(this.note)]
      this.current = JSON.parse(JSON.stringify(this.note))
    },

    saveChange () {
      this.note = JSON.parse(JSON.stringify(this.current))
      this.reset()
    }
  }
}
</script>
