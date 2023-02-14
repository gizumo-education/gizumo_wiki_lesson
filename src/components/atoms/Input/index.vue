<template>
  <div>
    <input
      :class="classes"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('update-value', $event)"
    >

    <transition name="shake">
      <ul v-if="errorMessages.length" class="error">
        <li
          v-for="error in errorMessages"
          :key="error"
          class="error__text"
        >
          {{ error }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    errorMessages: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: 'inputName',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '入力してください',
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    whiteBg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        input: true,
        'input--white-bg': this.whiteBg,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/* Defaultスタイル */
.input {
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid $separator-color;
  transition: all .5s;
  &:focus {
    border-bottom-color: $theme-color;
  }
}

.input--white-bg {
  background-color: #fff;
}

.error {
  margin-top: 10px;
  &__text {
    display: inline-block;
    padding: 5px 20px;
    color: $white;
    opacity: .8;
    font-size: 13px;
    background-color: $error-color;
  }
}
.shake-enter-active {
  animation: shake .6s;
}
@keyframes shake {
  10% { transform: translate3d(-4px, 0, 0); }
  20% { transform: translate3d(4px, 0, 0); }
  30% { transform: translate3d(-3px, 0, 0); }
  40% { transform: translate3d(3px, 0, 0); }
  50% { transform: translate3d(-2px, 0, 0); }
  60% { transform: translate3d(2px, 0, 0); }
  70% { transform: translate3d(-1px, 0, 0); }
  80% { transform: translate3d(1px, 0, 0); }
  90% { transform: translate3d(-1px, 0, 0); }
}
</style>
