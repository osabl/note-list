import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noteList: JSON.parse(localStorage.getItem('noteList') || '[]')
  },
  mutations: {
    addNote (state, note) {
      state.noteList.unshift(note)
      localStorage.setItem('noteList', JSON.stringify(state.noteList))
    },
    updateNote (state, note) {
      state.noteList[state.noteList.findIndex(oldNote => oldNote.id === note.id)] = JSON.parse(JSON.stringify(note))
    }
  },
  actions: {
    addNote ({ commit }, note) {
      commit('addNote', note)
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
