<template>
  <div>
    <div v-if="getNote()" class="note">
      <div class="note__header">
        <router-link to="/">Back</router-link>
        <div class="note-actions">
           <Modal :show="modalCancel"
            @confirmed="cancelChange"
            @canceled="modalCancel = false"
          >
            <p>Are you sure you want to undo the changes?</p>
          </Modal>
          <Modal :show="modalRemove"
            @confirmed="removeNote"
            @canceled="modalRemove = false"
          >
            <p>Are you sure you want to remove the note?</p>
          </Modal>

          <button @click="undoChange" :disabled="index === 0">undo</button>
          <button @click="redoChange" :disabled="index + 1 === history.length">redo</button>
          <button @click="modalCancel = true" :disabled="!isNoteChanged">cancel</button>
          <button @click="modalRemove = true">remove</button>
          <button @click="saveChange" :disabled="!isNoteChanged">save</button>
        </div>

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
  data () {
    return {
      index: 0,
      history: [JSON.stringify(this.getNote())],
      currentInstance: JSON.parse(JSON.stringify(this.getNote())),
      lock: false,
      modalRemove: false, // trigger for show modal dialog to confirm remove note
      modalCancel: false, // trigger for show modal dialog to confirm cancel changes
      backdoor: 0 // hack to update computed property
    }
  },
  computed: {
    isNoteChanged () {
      // Hack to update this computed property.
      // This is necessary to update the state of the buttons after note saving.
      // I did not find another way to solve this problem, yet.
      // I will change this value to update the property
      console.log(this.backdoor) // console.log -> because the StandardJS prohibits the use of simple property references

      return this.history[this.index] !== JSON.stringify(this.getNote())
    }
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
    TodoList,
    Modal
  },
  methods: {
    getNote () {
      return this.$store.getters.getNoteById(+this.$route.params.id) || null
    },
    removeNote () {
      this.modalRemove = false
      this.$store.dispatch('removeNote', this.getNote())
      this.$router.push('/')
    },
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
    cancelChange () {
      this.modalCancel = false
      this.lock = true
      this.index = 0
      this.history = [JSON.stringify(this.getNote())]
      this.currentInstance = JSON.parse(JSON.stringify(this.getNote()))
    },
    saveChange () {
      this.$store.dispatch('updateNote', this.currentInstance)
      this.backdoor++ // hack to update computed property after saving
    }
  }
}
</script>
