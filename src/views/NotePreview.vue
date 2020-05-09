<template>
  <div class="note note-preview">
    <div class="note__actions">
      <Modal @confirm="removeNote(note)" @cancel="showModal = false" :show="showModal"><p>Are you sure?</p></Modal>
      <button @click="showModal = true" class="remove">Delete</button>
    </div>
    <router-link :to="'/note/' + note.id">
      <div class="note__header">
        <h2 class="note__title">{{ note.title }}</h2>
      </div>
      <div class="note__body">
        <ul v-if="note.list.length" class="note__list">
          <li class="note__item"
            v-for="item in noteList"
            :key="item.id">
            <input type="checkbox" :checked="item.completed">
            <label>{{ item.title }}</label>
          </li>
        </ul>
        <p v-else>This note is empty...</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
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
  components: {
    Modal
  },
  methods: {
    removeNote (note) {
      this.showModal = false
      this.$emit('removeNote', note)
    }
  }
}
</script>
