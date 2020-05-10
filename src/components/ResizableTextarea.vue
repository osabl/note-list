<template>
  <div class="textarea-wrapper">
    <textarea
      :value="value"
      :id="id"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      :required="required"
      ref="textarea"
      @input="resizeAndSend($event.target)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keydown.enter="$emit('keydown-enter', $event)">
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 1
    },
    cols: {
      type: Number,
      default: 1
    },
    id: String,
    value: String,
    placeholder: String,
    required: Boolean
  },

  mounted () {
    //  if the textarea has some initial content, to update its height initially
    this.$refs.textarea.style.height = 'auto'
    this.$refs.textarea.style.height = `${this.$refs.textarea.scrollHeight}px`
  },

  methods: {
    resizeAndSend (target) {
      this.resizeTextarea(target)
      this.$emit('input', target.value)
    },
    resizeTextarea (textarea) {
      this.$refs.textarea.style.height = 'auto'
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
    }
  }
}
</script>

<style scoped>
.textarea-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  height: auto;
  padding: 1px;
}

textarea {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.5em;

  overflow-y: hidden;

  width: 100%;
  height: 100%;
  padding: 0 1em;

  resize: none;
  transition: 0.4s ease;

  color: rgb(30, 30, 30);
  border: none;
  border-bottom: 1px solid rgba(179, 179, 179, 0);
  outline: none;
}

</style>
