<template>
  <div class="note-wrapper">

    <div v-if="getNote()" class="note">

      <div class="note__header">
        <Modal :show="showModalCancel"
          @confirmed="cancelChange"
          @canceled="showModalCancel = false">
          <p>Вы уверены что хотите отменить все изменения?</p>
        </Modal>
        <Modal :show="showModalRemove"
          @confirmed="removeNote"
          @canceled="showModalRemove = false">
          <p>Вы уверены что хотите удалить заметку?</p>
        </Modal>

        <router-link to="/" class="btn"><span class="icon icon-back"></span></router-link>

        <div class="note__actions">
          <button class="btn undo"
            :disabled="index === 0"
            @click="undoChange">
            <span class="icon icon-undo"></span>
          </button>
          <button class="btn redo"
            :disabled="index + 1 === history.length"
            @click="redoChange">
            <span class="icon icon-redo"></span>
          </button>
          <button class="btn cancel"
            :disabled="!isNoteChanged"
            @click="showModalCancel = true">
            <span class="icon icon-cancel"></span>
          </button>
          <button class="btn remove"
            @click="showModalRemove = true">
            <span class="icon icon-remove"></span>
          </button>
          <button class="btn save"
            :disabled="!isNoteChanged"
            @click="saveChange">
            <span class="icon icon-save"></span>
          </button>
        </div>
      </div>

      <div class="note__body">
        <ResizableTextarea class="note__title"
          v-model="currentState.title"
          :placeholder="'Заголовок'"
        />

        <TodoAdd @add-todo="addTodo"/>
        <TodoList
          :todoList="currentState.list"
          @add-todo="addTodo"
          @remove-todo="removeTodo"
        />
      </div>

    </div>

    <div v-else>
      <h1>Заметка не найдена!</h1>
      <router-link to="/">Вернуться на главную страницу.</router-link>
    </div>

  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import TodoAdd from '@/components/TodoAdd.vue'
import TodoList from '@/components/TodoList.vue'
import ResizableTextarea from '@/components/ResizableTextarea.vue'

export default {
  components: {
    TodoAdd,
    TodoList,
    Modal,
    ResizableTextarea
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

<style>
.note__header {
  display: flex;
  justify-content: space-between;

  margin: 0 0.5em;
}
.note {
  max-width: 700px;
  margin: 0.2em;
  padding: 0.8em 0.5em;

  border-radius: 1.5em;
  background-color: #ffffff;
  -webkit-box-shadow: 0 0 21px 4px rgba(0,0,0,0.25);
     -moz-box-shadow: 0 0 21px 4px rgba(0,0,0,0.25);
          box-shadow: 0 0 21px 4px rgba(0,0,0,0.25);
}
@media screen and (min-width: 425px) {
  .note {
    margin: 1em;
  }
}
@media screen and (min-width: 768px) {
  .note {
    margin: 3em auto;
  }
}
.btn {
  font-size: 20px;

  cursor: pointer;
  transition: 0.2s ease;

  color: rgb(121, 54, 141);
  border: none;
  background: none;
}

.btn:hover {
  color: rgb(212, 0, 255);
}

.btn:disabled {
  cursor: default;

  color: rgb(167, 167, 167);
}

.note__title {
  margin: 1em;
  margin-top: 0.7em;
  margin-bottom: 2em;

  text-align: center;
}

.note__title textarea {
  font-size: 32px;

  text-align: center;

  color: rgb(34, 34, 34);
}

</style>
