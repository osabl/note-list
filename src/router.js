import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/',
      component: () => import('@/views/NoteList.vue')
    },
    {
      path: '/note/:id',
      component: () => import('@/views/Note.vue')
    }
  ]
})
