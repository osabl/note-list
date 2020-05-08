<template>
  <div id="app">
    <h1>Note</h1>
    <hr />
    <Note/>
  </div>
</template>

<script>
import Note from './components/Note.vue'
// import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Note
  }
  // computed: mapState({ note: state => state.notes[0] })
}
</script>

<style>
</style>
