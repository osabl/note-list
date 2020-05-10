<template>
  <div class="note-preview">

    <div class="note-preview__header">
      <div class="note-preview__actions">
        <Modal
          :show="showModal"
          @confirmed="removeNote(note)"
          @canceled="showModal = false">
          <p>Are you sure?</p>
        </Modal>
        <button class="btn remove"
          @click.stop="showModal = true">
          <span class="icon icon-remove"></span>
        </button>
        <router-link :to="'/note/' + note.id" class="btn" tag="button">
          <span class="icon icon-link"></span>
        </router-link>
      </div>
      <h2 class="note-preview__title">{{ note.title }}</h2>
    </div>

    <hr class="hr">

    <div class="note-preview__body">
      <ul v-if="note.list.length" class="todo__list">
        <li class="todo__item"
          v-for="todo in noteList"
          :key="todo.id">

          <input class="todo__checkbox" type="checkbox"
            v-show="false"
            :id="todo.id"
            :checked="todo.completed"
          >
          <label class="todo__checkbox-label"
            :for="todo.id">
            <span class="icon icon-ok"></span>
          </label>

          <label class="todo__title">{{ todo.title }}</label>

        </li>
      </ul>

      <p v-else class="empty">This note is empty...</p>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Modal
  },

  props: ['note'],

  data () {
    return {
      showModal: false
    }
  },

  computed: {
    noteList () {
      return this.note.list.slice(0, 5)
    }
  },

  methods: {
    removeNote (note) {
      this.showModal = false
      this.$emit('removeNote', note)
    }
  }
}
</script>

<style scoped>
.note-preview {
  min-width: 300px;
  width: auto;
  max-width: 700px;
  margin: 1.5em auto;
  padding: 0.8em 0.5em;

  border-radius: 1.5em;
  background-color: #ffffff;
  -webkit-box-shadow: 0 0 21px 4px rgba(0,0,0,0.25);
     -moz-box-shadow: 0 0 21px 4px rgba(0,0,0,0.25);
          box-shadow: 0 0 21px 4px rgba(0,0,0,0.25);
}

.note-preview__actions {
  display: flex;
  justify-content: space-between;
}

.note-preview__title {
  font-size: 32px;
  font-weight: normal;
  line-height: 1.5em;

  text-align: center;

  color: rgb(34, 34, 34);
}

.note-preview-preview a {
  text-decoration: none;

  color: initial;
}

.todo__list {
  padding-left: 0;
}

.todo__item {
  display: flex;

  padding: 0.5em;
}

.todo__title {
  width: 100%;
  margin: 0 0.5em;
}

.todo__checkbox-label {
  width: min-content;
  height: min-content;

  transition: 0.05s ease;

  color: transparent;
  border: 1px solid rgb(100, 100, 100);
  border-radius: 0.5em;
}

.todo__checkbox:checked ~ .todo__checkbox-label {
  color: rgb(155, 59, 184);
  border: 1px solid rgb(70, 70, 70);
}

.hr {
  width: 80%;
  border-radius: 1em;
  border: 1px solid gray;
}

.empty {
    text-align: center;
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
</style>
