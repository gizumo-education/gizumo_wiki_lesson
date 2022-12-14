<template>
  <div class="select">
    <div class="select__inner">
      <select
        :class="classes"
        :name="name"
        :value="value"
        @input="$emit('update-value', $event)"
      >
        <slot />
      </select>
    </div>

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
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid $separator-color;
  transition: all .5s;
  &:focus {
    border-bottom-color: $theme-color;
  }
}

.select__inner {
  margin-top: 5px;
  position: relative;
  &:after {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 5px solid $theme-color;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: "";
    pointer-events: none;
  }
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
