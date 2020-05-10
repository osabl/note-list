<template>
  <div class="note-wrapper">

    <div v-if="getNote()" class="note">

      <div class="note__header">
        <div class="note__actions">

          <Modal :show="showModalCancel"
            @confirmed="cancelChange"
            @canceled="showModalCancel = false">
            <p>Are you sure you want to cancel the changes?</p>
          </Modal>
          <Modal :show="showModalRemove"
            @confirmed="removeNote"
            @canceled="showModalRemove = false">
            <p>Are you sure you want to remove the note?</p>
          </Modal>

          <router-link to="/">Back</router-link>

          <button class="btn undo"
            :disabled="index === 0"
            @click="undoChange">undo</button>
          <button class="btn redo"
            :disabled="index + 1 === history.length"
            @click="redoChange">redo</button>
          <button class="btn cancel"
            :disabled="!isNoteChanged"
            @click="showModalCancel = true">cancel</button>
          <button class="btn remove"
            @click="showModalRemove = true">remove</button>
          <button class="btn save"
            :disabled="!isNoteChanged"
            @click="saveChange">save</button>

        </div>

        <h2 class="note__title">{{ currentState.title }}</h2>

      </div>

      <div class="note__body">
        <TodoAdd @add-todo="addTodo"/>
        <TodoList
          :todoList="currentState.list"
          @add-todo="addTodo"
          @remove-todo="removeTodo"
        />
      </div>

    </div>

    <div v-else>
      <h1>Task not found!</h1>
      <router-link to="/">BACK</router-link>
    </div>

  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import TodoAdd from '@/components/TodoAdd.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  components: {
    TodoAdd,
    TodoList,
    Modal
  },

  data () {
    return {
      index: 0, // pointer to the active state in the history of states
      history: [JSON.stringify(this.getNote())], // a history of states for undo and redo action
      currentState: JSON.parse(JSON.stringify(this.getNote())), // copy of the initial state
      lock: false, // to block the watch
      showModalRemove: false, // trigger for show modal dialog to confirm remove note
      showModalCancel: false // trigger for show modal dialog to confirm cancel changes
    }
  },

  computed: {
    isNoteChanged () {
      return this.history[this.index] !== JSON.stringify(this.getNote())
    }
  },

  watch: {
    // writes state changes to history
    currentState: {
      handler () {
        if (this.lock) {
          this.lock = false
          return
        }

        // trim array & increment index
        if (this.history.length > this.index++) {
          this.history.length = this.index
        }

        this.history.push(JSON.stringify(this.currentState))
      },
      deep: true
    }
  },

  methods: {
    getNote () {
      return this.$store.getters.getNoteById(+this.$route.params.id) || null
    },
    removeNote () {
      this.showModalRemove = false
      this.$store.dispatch('removeNote', this.getNote())
      this.$router.push('/')
    },
    removeTodo (target) {
      this.currentState.list = this.currentState.list.filter(todo => todo.id !== target.id)
    },
    addTodo (todo) {
      this.currentState.list.unshift(todo)
    },
    undoChange () {
      if (this.index > 0) {
        this.lock = true
        this.index--
        this.currentState = JSON.parse(this.history[this.index])
      }
    },
    redoChange () {
      if (this.index + 1 < this.history.length) {
        this.lock = true
        this.index++
        this.currentState = JSON.parse(this.history[this.index])
      }
    },
    reset () {
      this.lock = true
      this.index = 0
      this.history = [JSON.stringify(this.getNote())]
      this.currentState = JSON.parse(JSON.stringify(this.getNote()))
    },
    cancelChange () {
      this.showModalCancel = false
      this.reset()
    },
    saveChange () {
      this.$store.dispatch('updateNote', this.currentState)
      this.reset()
    }
  }
}
</script>
