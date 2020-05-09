<template>
  <div v-if="show" class="modal-mask">
    <div class="modal">
      <div class="modal__header">
        <h2 class="modal__title">Confirm your actions!</h2>
      </div>
      <div class="modal__body">
        <slot>Are you sure you want to do this?</slot>
      </div>
      <div class="modal__footer">
        <button @click="confirm" class="btn confirm">Yes</button>
        <button @click="cancel" class="btn cancel">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;

    display: flex;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5);
}
.modal {
    width: 300px;
    margin: 0 auto;
    padding: 20px 30px;

    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

</style>
