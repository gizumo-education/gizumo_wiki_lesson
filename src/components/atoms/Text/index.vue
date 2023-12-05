<template>
  <component :is="tag" :class="classes"><slot /></component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'p',
    },
    bold: {
      type: Boolean,
      default: false,
    },
    inlineBlock: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    themeColor: {
      type: Boolean,
      default: false,
    },
    bgSuccess: {
      type: Boolean,
      default: false,
    },
    bgError: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    exSmall: {
      type: Boolean,
      default: false,
    },
    exLarge: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        text: true,
        'text--bold': this.bold,
        'text--inline-block': this.inlineBlock,
        'text--error': this.error,
        'text--themecolor': this.themeColor,
        'text--bg-success': this.bgSuccess,
        'text--bg-error': this.bgError,
        'text--small': this.small,
        'text--ex-small': this.exSmall,
        'text--ex-large': this.exLarge,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/* Defaultスタイル */
.text {
  font-size: 16px;
  word-break: break-all;
}

.text--bold {
  font-weight: $bold;
}
.text--inline-block {
  display: inline-block;
}
.text--themecolor {
  color: $theme-color;
}
.text--bg-success {
  padding: 10px 15px;
  color: #fff;
  border-left: 8px solid $theme-color;
  background-color: $theme-color;
}
.text--error {
  color: $error-color;
}
.text--bg-error {
  padding: 10px 15px;
  color: #fff;
  border-left: 8px solid $error-color;
  background-color: $error-color;
}
.text--ex-large {
  font-size: 24px;
}
.text--small {
  font-size: 14px;
}
.text--ex-small {
  font-size: 12px;
}
/* Unique（For Props）スタイル */
</style>
