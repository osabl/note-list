<template>
  <div id="app">
    <h1>Note</h1>
    <hr />
    <Note
    :note="note"
    />
  </div>
</template>

<script>
import Note from './components/Note.vue'

export default {
  name: 'App',
  components: {
    Note
  },
  data () {
    return {
      note: {
        title: 'Just do it',
        list: [
          { id: 1, title: 'test message 1', completed: false },
          { id: 2, title: 'test message 2', completed: false },
          { id: 3, title: 'test message 3', completed: false },
          { id: 4, title: 'test message 4', completed: false }
        ]
      }
    }
  }
}
</script>

<style>
</style>
