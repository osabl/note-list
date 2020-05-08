<template>
  <div class="note">
    <div class="actions">
      <button @click="undoChange">undo</button>
      <button @click="redoChange">redo</button>
      <button @click="reset">cancel</button>
      <button @click="saveChange">save</button>
    </div>
    <h2>{{ note.title }}</h2>

    <TodoAdd @add-todo="addTodo"/>

    <ul class="todo-list">
      <Todo v-for="todo in note.list"
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
      history: [JSON.stringify(this.$store.getters.getCopyNoteById(0))],
      note: this.$store.getters.getCopyNoteById(0),
      lock: false
    }
  },
  watch: {
    note: {
      handler () {
        if (this.lock) {
          this.lock = false
          return
        }

        // trim array & increment index
        if (this.history.length > this.index++) {
          this.history.length = this.index
        }

        this.history.push(JSON.stringify(this.note))
      },
      deep: true
    }
  },
  components: {
    TodoAdd,
    Todo
  },
  methods: {
    removeTodo (target) {
      this.note.list = this.note.list.filter(todo => todo.id !== target.id)
    },

    addTodo (todo) {
      this.note.list.unshift(todo)
    },

    undoChange () {
      if (this.index > 0) {
        this.lock = true
        this.index--
        this.note = JSON.parse(this.history[this.index])
      }
    },

    redoChange () {
      if (this.index + 1 < this.history.length) {
        this.lock = true
        this.index++
        this.note = JSON.parse(this.history[this.index])
      }
    },

    reset () {
      this.lock = true
      this.index = 0
      this.history = [JSON.stringify(this.$store.getters.getCopyNoteById(0))]
      this.note = this.$store.getters.getCopyNoteById(0)
    },

    saveChange () {
      this.$store.dispatch('updateNote', this.note)
      this.reset()
    }
  }
}
</script>
