import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noteList: [{
      id: 0,
      title: 'Note 1',
      list: [
        { id: 1, title: 'test message 1 from Note 1', completed: false },
        { id: 2, title: 'test message 2 from Note 1', completed: false },
        { id: 3, title: 'test message 3 from Note 1', completed: false },
        { id: 4, title: 'test message 4 from Note 1', completed: false }
      ]
    }, {
      id: 1,
      title: 'Note 2',
      list: [
        { id: 1, title: 'test message 1 from Note 2', completed: false },
        { id: 2, title: 'test message 2 from Note 2', completed: false },
        { id: 3, title: 'test message 3 from Note 2', completed: false },
        { id: 4, title: 'test message 4 from Note 2', completed: false }
      ]
    }]
  },
  mutations: {
    createNote (state, note) {
      state.noteList.push(note)
    },
    updateNote (state, note) {
      state.noteList[state.noteList.findIndex(oldNote => oldNote.id === note.id)] = JSON.parse(JSON.stringify(note))
    }
  },
  actions: {
    createNote ({ commit }, note) {
      commit('createNote', note)
    },
    updateNote ({ commit }, note) {
      commit('updateNote', note)
    }
  },
  getters: {
    getNoteList (state) {
      return state.noteList
    },
    getNoteById (state) {
      return id => state.noteList.find(note => note.id === id)
    }
  }
})
