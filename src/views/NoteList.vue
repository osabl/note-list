<template>
  <div>
    <h1>Hello world!</h1>
    <div @click="createNote">
      <h2>Create new note</h2>
      <div>
        Click me to create new note
      </div>
    </div>

    <NotePreview v-for="note in noteList" :key="note.id" :note="note" @removeNote="removeNote"/>
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
