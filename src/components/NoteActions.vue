<template>
  <div class="note-actions">
    <button @click="undo">undo</button>
    <button @click="redo">redo</button>
    <button @click="cancel">cancel</button>
    <button @click="save">save</button>
  </div>
</template>

<script>
export default {
  methods: {
    undo () {
      this.$emit('undo')
    },
    redo () {
      this.$emit('redo')
    },
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$emit('save')
    }
  }
}
</script>
