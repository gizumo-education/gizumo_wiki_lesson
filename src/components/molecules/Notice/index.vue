<template>
  <div class="notice">
    <app-text ex-large>
      {{ noticeText }}
    </app-text>

    <div class="notice__link">
      <app-router-link :to="linkPath" underline key-color>
        {{ linkText }}
      </app-router-link>
    </div>
  </div>
</template>

<script>
import { Text, RouterLink } from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    noticeText: {
      type: String,
      default: '',
    },
    linkPath: {
      type: String,
      default: '',
    },
    linkText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  margin-top: 80px;
  width: 100%;
  text-align: center;
}
</style>
