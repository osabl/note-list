<template>
  <form class="todo__add" @submit.prevent="addTodo">

    <ResizableTextarea class="todo__title"
      v-model="title"
      :placeholder="'Напишите вашу задачу здесь'"
      @keydown-enter.prevent="addTodo"
    />
    <button class="btn btn-submit" type="submit"><span class="icon icon-add"></span></button>

  </form>
</template>

<script>
import ResizableTextarea from '@/components/ResizableTextarea.vue'

export default {
  components: {
    ResizableTextarea
  },

  data () {
    return {
      title: ''
    }
  },

  methods: {
    addTodo () {
      const title = this.title.trim()

      if (title) {
        const todo = {
          id: Date.now(),
          title: title,
          completed: false
        }

        this.$emit('add-todo', todo)
        this.title = ''
      }
    }
  }
}
</script>

<style>
.todo__add {
  display: flex;
  flex-wrap: nowrap;

  padding: 0.5em;
}

.todo__title {
  width: 100%;
  margin: 0 0.5em;
}

.todo__add .todo__title textarea {
  border-bottom: 1px solid rgb(155, 59, 184, 0.7);
}

.todo__add .todo__title textarea:hover,
.todo__add .todo__title textarea:focus {
  border-bottom: 1px solid rgb(155, 59, 184);
  background: none;
}

.btn-submit {
  width: min-content;
  height: min-content;
  padding: 0;

  border: none;
  outline: none;
  background: none;
}

.btn-submit span::before {
  margin: 0;
  padding: 5px;

  transition: 0.1s ease;

  border-radius: 50%;
}

.btn-submit span {
  width: min-content;
  height: min-content;
  margin: 0;
  padding: 0;

  transition: 0.1s ease;

  color: rgb(59, 59, 59);
  border-radius: 50%;
}

.btn-submit:hover span::before {
  color: white;
  background-color: rgb(169, 88, 194);
}

.btn-submit:active span::before {
  color: white;
  background-color: rgb(185, 113, 207);
}

</style>
