<template>
  <!-- check to wait for instanceof to load -->
  <div v-if="currentInstance" class="note">
    <div class="note__header">
      <router-link to="/">Back</router-link>
      <NoteActions
        @undo="undoChange"
        @redo="redoChange"
        @cancel="reset"
        @save="saveChange"
      />
      <h2>{{ currentInstance.title }}</h2>
    </div>

    <div class="note__body">
      <TodoAdd @add-todo="addTodo"/>
      <TodoList
        :todoList="currentInstance.list"
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
      history: [],
      currentInstance: null,
      lock: false
    }
  },
  computed: {
    note () {
      return this.$store.getters.getNoteById(+this.$route.params.id)
    }
  },
  mounted () {
    this.history.push(JSON.stringify(this.note))
    this.currentInstance = JSON.parse(JSON.stringify(this.note))
  },
  watch: {
    currentInstance: {
      handler () {
        if (this.lock) {
          this.lock = false
          return
        }

        // trim array & increment index
        if (this.history.length > this.index++) {
          this.history.length = this.index
        }

        this.history.push(JSON.stringify(this.currentInstance))
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
      this.currentInstance.list = this.currentInstance.list.filter(todo => todo.id !== target.id)
    },
    addTodo (todo) {
      this.currentInstance.list.unshift(todo)
    },
    undoChange () {
      if (this.index > 0) {
        this.lock = true
        this.index--
        this.currentInstance = JSON.parse(this.history[this.index])
      }
    },
    redoChange () {
      if (this.index + 1 < this.history.length) {
        this.lock = true
        this.index++
        this.currentInstance = JSON.parse(this.history[this.index])
      }
    },
    reset () {
      this.lock = true
      this.index = 0
      this.history = [JSON.stringify(this.note)]
      this.currentInstance = JSON.parse(JSON.stringify(this.note))
    },
    saveChange () {
      this.$store.dispatch('updateNote', this.currentInstance)
      this.reset()
    }
  }
}
</script>
