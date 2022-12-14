<template>
  <component
    :is="tag"
    :class="className || defaultClass"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    tag() {
      return this.level >= 7 ? 'h1' : `h${this.level}`;
    },
    defaultClass() {
      switch (this.level) {
        case 1:
          return 'heading--primary';
        case 2:
          return 'heading--secondary';
        case 3:
          return 'heading--tertiary';
        case 4:
          return 'heading--quaternary';
        case 5:
          return 'heading--quinary';
        case 6:
          return 'heading--senary';
        default:
          return 'heading--primary';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* Defaultスタイル */
.heading--primary {
  padding: 3px 5px;
  padding-left: 15px;
  font-size: 24px;
  border-left: 5px solid $theme-color;
  border-bottom: 1px solid $separator-color;
}
.heading--secondary {
  font-size: 20px;
  padding: 0 20px 4px 20px;
  border-bottom: 6px double $theme-color;
}
.header__title {
  font-size: 20px;
  color: #fff;
  font-weight: $bold;
}
</style>
