<template>
  <li class="todo__item" :class="{completed: todo.completed}">

    <input class="todo__checkbox" :id="todo.id" type="checkbox"
      v-model="todo.completed"
      v-show="false"
    >
    <label class="todo__checkbox-label"
      :for="todo.id">
      <span class="icon icon-ok"></span>
    </label>

    <ResizableTextarea
      class="todo__title"
      v-model="title"
      @focus="startEdit"
      @blur="doneEdit"
      @keyup.esc="cancelEdit"
    />

    <button class="btn btn-remove"
      @click="removeTodo"><span class="icon icon-clean"></span></button>

  </li>
</template>

<script>
import ResizableTextarea from '@/components/ResizableTextarea.vue'

export default {
  components: {
    ResizableTextarea
  },

  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      title: this.todo.title
    }
  },

  watch: {
    todo () {
      this.title = this.todo.title
    }
  },

  methods: {
    removeTodo () {
      this.$emit('remove-todo', this.todo)
    },
    startEdit () {
      this.beforeEditCache = this.todo.title
    },
    doneEdit () {
      this.beforeEditCache = null
      this.title = this.title.trim()
      if (!this.title) {
        this.removeTodo()
      }
      this.todo.title = this.title
    },
    cancelEdit (todo) {
      this.title = this.beforeEditCache
    }
  }
}
</script>

<style>
.todo__checkbox-label {
  width: min-content;
  height: min-content;

  transition: 0.05s ease;

  color: transparent;
  border: 1px solid rgb(100, 100, 100);
  border-radius: 0.5em;
}

.todo__checkbox:checked ~ .todo__checkbox-label {
  color: rgb(155, 59, 184);
  border: 1px solid rgb(70, 70, 70);
}

.todo__item {
  display: flex;

  padding: 0.5em;
}

.todo__title {
  width: 100%;
  margin: 0 0.5em;
}

.todo__title textarea {
  width: 100%;
}

.btn-remove {
  font-size: 1em;

  height: min-content;
  padding: 0;

  border: none;
  outline: none;
  background-color: transparent;
}

.btn-remove span::before {
  margin: 0;
  padding: 5px;

  transition: 0.1s ease;
  text-align: center;
  vertical-align: middle;

  color: rgb(59, 59, 59);
  border-radius: 50%;
}
.btn-remove:hover span::before {
  color: white;
  background-color: rgb(207, 59, 54);
}
.btn-remove:active span::before {
  color: white;
  background-color: rgb(247, 94, 89);
}

.todo__title textarea:hover,
.todo__title textarea:focus {
  border-bottom: 1px solid rgba(179, 179, 179, 0.5);
  background-color: rgb(255, 250, 255, 0.5);
}

.completed {
  text-decoration: line-through rgb(77, 77, 77);
}

</style>
