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
      @keyup="$emit('keyup', $event)">
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
    width: 100%;
    height: auto;
    padding: 1px;

    border: 1px solid black;
  }

  textarea {
    overflow-y: hidden;

    width: 100%;
    height: 100%;
    padding: 0;

    resize: none;

    border: none;
    outline: none;
  }

</style>
