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
        <button class="btn confirm"
          @click="confirm">
          <span class="icon icon-ok"></span>
        </button>
        <button class="btn cancel"
          @click="cancel">
          <span class="icon icon-clean"></span>
        </button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    confirm () {
      this.$emit('confirmed')
    },
    cancel () {
      this.$emit('canceled')
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
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
}
.modal {
  margin: 0.7em;
  padding: 20px 30px;

  text-align: center;

  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.btn {
  font-size: 26px;

  margin: 0.25em 0.5em;
}

</style>
