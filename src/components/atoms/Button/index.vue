<template>
  <button
    :class="classes"
    :type="buttonType"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: 'button',
    },
    block: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    bold: {
      type: Boolean,
      default: false,
    },
    themeColor: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    bgDanger: {
      type: Boolean,
      default: false,
    },
    bgCaution: {
      type: Boolean,
      default: false,
    },
    bgWhite: {
      type: Boolean,
      defualt: false,
    },
    pointer: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        button: true,
        'button--block': this.block,
        'button--small': this.small,
        'button--round': this.round,
        'button--bold': this.bold,
        'button--theme-color': this.themeColor,
        'button--disabled': this.disabled,
        'button--danger': this.bgDanger,
        'button--bg-caution': this.bgCaution,
        'button--bg-white': this.bgWhite,
        'button--pointer': this.pointer,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/* Defaultスタイル */
.button {
  padding: 8px 20px;
  display: inline-block;
  font-size: 16px;
  line-height: 1.4;
  color: #fff;
  background-color: $theme-color;
  @include hoverOpacity;
}

.button--block {
  display: block;
  width: 100%;
}
.button--small {
  padding: 5px 12px;
  font-size: 14px;
}
.button--round {
  border-radius: 5px;
}
.button--bold {
  font-weight: $bold;
}
.button--theme-color {
  color: $theme-color;
}
.button--danger {
  background-color: $error-color;
}
.button--bg-caution {
  background-color: $caution-color;
}
.button--bg-white {
  background-color: #fff;
}
.button--disabled {
  background-color: $disabled-color;
  cursor: default;
  &:hover {
    opacity: 1;
  }
}
.button--pointer {
  cursor: pointer;
}
</style>
