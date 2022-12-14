<template>
  <router-link
    :to="to"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="classes"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    activeClass: {
      type: String,
      default: '',
    },
    exactActiveClass: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    underline: {
      type: Boolean,
      default: false,
    },
    themeColor: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    bgThemeColor: {
      type: Boolean,
      default: false,
    },
    bgDanger: {
      type: Boolean,
      default: false,
    },
    bgLightgreen: {
      type: Boolean,
      default: false,
    },
    hoverOpacity: {
      type: Boolean,
      default: false,
    },
    hoverUnderline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'router-link': true,
        'router-link--block': this.block,
        'router-link--large': this.large,
        'router-link--small': this.small,
        'router-link--underline': this.underline,
        'router-link--themecolor': this.themeColor,
        'router-link--danger': this.danger,
        'router-link--white': this.white,
        'router-link--round': this.round,
        'router-link--bg-themecolor': this.bgThemeColor,
        'router-link--bg-danger': this.bgDanger,
        'router-link--bg-lightgreen': this.bgLightgreen,
        'router-link--hover-opacity': this.hoverOpacity,
        'router-link--hover-underline': this.hoverUnderline,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link {
  font-size: 16px;
  transition: all .5s;
  line-height: 1.4;
  &.is-active {
    color: $sub-theme-color;
    font-weight: bold;
    background-color: #fff;
    pointer-events: none;
  }
}
.router-link--hover-opacity {
  @include hoverOpacity;
}
.router-link--hover-underline {
  @include hoverUnderline;
}
.router-link--block {
  display: block;
}
.router-link--large {
  padding: 10px 20px;
}
.router-link--small {
  padding: 5px 10px;
  font-size: 14px;
}
.router-link--underline {
  text-decoration: underline;
}
.router-link--themecolor {
  color: $theme-color;
}
.router-link--danger {
  color: $error-color;
}
.router-link--white {
  color: #fff;
}
.router-link--bg-themecolor {
  background-color: $theme-color;
}
.router-link--bg-danger {
  background-color: $error-color;
}
.router-link--bg-lightgreen {
  background-color: $create-color;
}
.router-link--round {
  border-radius: 5px;
}
</style>
