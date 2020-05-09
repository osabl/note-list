<template>
  <li class="todo-item" :class="{completed: todo.completed, editing: this.editing}">

    <input type="checkbox" v-model="todo.completed">

    <label @dblclick="editTodo">{{ todo.title }}</label>
    <input class="edit" type="text"
      v-focus="editing"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      v-model="title"
    >

    <button class="btn btn-edit"
      @click="editTodo">edit</button>
    <button class="btn btn-remove"
      @click="removeTodo">-</button>

  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      title: this.todo.title,
      editing: false // trigger for the focus directive
    }
  },

  methods: {
    removeTodo () {
      this.$emit('remove-todo', this.todo)
    },
    editTodo () {
      this.editing = true
      this.beforeEditCache = this.todo.title
    },
    doneEdit () {
      this.editing = false
      this.beforeEditCache = null
      this.title = this.title.trim()
      if (!this.title) {
        this.removeTodo()
      }
      this.todo.title = this.title
    },
    cancelEdit (todo) {
      this.editing = false
      this.title = this.beforeEditCache
    }
  },

  directives: {
    focus (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>

.completed {
  text-decoration: line-through;
}

.edit {
  display: none;
}

.editing .edit {
    display: initial;
  }

.editing label {
    display: none;
  }

.btn {
  margin-left: 10px;
}
</style>
