<template>
  <div class="note-list">

    <div class="note-creator"
      @click="createNote">
      <div class="note-creator__header">
        <h2 class="note-creator__title">Create new note</h2>
      </div>
      <div class="note-creator__body">
        <div class="note-creator__create">
          <span class="icon icon-plus"></span>
        </div>
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
        title: '',
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

<style scoped>
.note-creator {
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

.note-creator__actions {
  display: flex;
  justify-content: space-between;
}

.note-creator__title {
  font-size: 32px;
  font-weight: normal;
  line-height: 1.5em;

  text-align: center;

  color: rgb(34, 34, 34);
}

.note-creator__body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.note-creator__create {
  display: flex;
  margin: 1em;
  text-align: center;
  vertical-align: middle;
  height: 70px;
  width: 70px;
  border: 1px solid rgb(169, 157, 173);;
  border-radius: 1em;
}

.note-creator__create span {
  font-size: 30px;
  margin: auto;
  color: rgb(121, 54, 141);
  transition: 0.2s ease;
}

.note-creator__create:hover span {
  color: rgb(93, 0, 112);
}

.note-creator__create:hover {
  background-color: rgb(255, 249, 253)
}

.note-list {
  display: grid;
  grid-template-columns: 1fr;
}
@media screen and (min-width: 768px) {
  .note-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 1280px) {
  .note-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
