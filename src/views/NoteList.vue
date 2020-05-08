<template>
  <div>
    <h1>Hello world!</h1>
    <div @click="createNote">
      <h2>Create new note</h2>
      <div>
        Click me to create new note
      </div>
    </div>

    <router-link
      v-for="note in noteList"
      :key="note.id"
      :to="'/note/' + note.id">
      <div class="note__header">
        <h2>{{ note.title }}</h2>
        <button @click="removeNote(note)">remove</button>
      </div>
      <div class="note__body">
        <ul v-if="note.list.length" class="note__list">
          <li class="note__item"
            v-for="item in note.list.slice(0, 5)"
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
export default {
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

      this.$store.dispatch('createNote', note)
    },
    removeNote (note) {
      console.log(note)
      this.$store.dispatch('removeNote', note)
    }
  }
}
</script>
