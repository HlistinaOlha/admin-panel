<template>
  <teleport to="body">
    <div v-if="show" class="backdrop"></div>
    <transition name="dialog">
      <dialog v-if="show" open>
        <header>
          <slot name="header">
            <div class="controls">
              <h2>{{ title }}</h2>
              <base-button mode="close" type="button" @click="tryClose">
                <font-awesome-icon
                  :icon="['fas', 'xmark']"/>
              </base-button>
            </div>
          </slot>
        </header>
        <section v-if="action">
          <form @submit.prevent="submitAction">
            <slot name="form"></slot>
            <menu>
              <slot name="actions">
                <base-button mode="outline" type="submit">{{ action }}</base-button>
              </slot>
            </menu>
          </form>
        </section>
        <section v-if="errorMessages"
                 class="error-wrapper">
          <div v-for="message in errorMessages" class="error-message">
            {{ message }}
          </div>
        </section>
        <section v-else>
          <slot></slot>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    action: {
      type: String,
      required: false,
    },
    errorMessages: {
      type: Array,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close', 'submitAction'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return
      }
      this.$emit('close')
    },
    submitAction() {
      this.$emit('submitAction')
    }
  },
}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 0.3125rem;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  background-color: white;
}

header {
  background-color: $base-color;
  color: white;
  width: 100%;
  padding: 1rem;
  border-top-left-radius: 0.3125rem;
  border-top-right-radius: 0.3125rem;

  h2 {
    margin: 0;
    font-weight: 500;
    font-size: 16px;
  }
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;

}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.error-wrapper {
  overflow: auto;
  max-height: 500px;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
