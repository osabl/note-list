<template>
  <div class="note-list">

    <div class="note note-creator"
      @click="createNote">
      <div class="note__header">
        <h2 class="note__title">Create new note</h2>
      </div>
      <div class="note__body">
        Click me to create new note
      </div>
    </div>

    <NotePreview
      v-for="note in noteList"
      :key="note.id"
      :note="note"
      @removeNote="removeNote"
    />

  </div>
</template>

<script>
import NotePreview from '@/views/NotePreview.vue'

export default {
  components: {
    NotePreview
  },

  computed: {
    noteList () {
      return this.$store.getters.getNoteList
    }
  },

  methods: {
    createNote () {
      const note = {
        id: Date.now(),
        title: 'Title',
        list: []
      }

      this.$store.dispatch('addNote', note)
      this.$router.push('/note/' + note.id)
    },
    removeNote (note) {
      this.$store.dispatch('removeNote', note)
    }
  }
}
</script>
