<template>
  <div class="note">
    <div class="note__header">
      <router-link to="/">Home</router-link>
      <NoteActions
        @undo="undoChange"
        @redo="redoChange"
        @cancel="reset"
        @save="saveChange"
      />
      <h2>{{ note.title }}</h2>
    </div>

    <div class="note__body">
      <TodoAdd @add-todo="addTodo"/>
      <TodoList
        :todoList="note.list"
        @remove-todo="removeTodo"
      />
    </div>
  </div>
</template>

<script>
import NoteActions from '@/components/NoteActions.vue'
import TodoAdd from '@/components/TodoAdd.vue'
import TodoList from '@/components/TodoList.vue'

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
    NoteActions,
    TodoList
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
