<template>
  <div class="articles-list">
    <app-heading :level="1">削除済み記事一覧</app-heading>

    <div class="articles-list__back">
      <app-router-link
        to="/articles"
        hover-opacity
        small
        white
        round
        bg-lightgreen
      >
        すべての記事一覧へ戻る
      </app-router-link>
    </div>

    <div v-if="errorMessage" class="articles-list__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="articles-list__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import { RouterLink, Heading, Text } from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appHeading: Heading,
    appText: Text,
  },
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.articles-list {
  &__back {
    margin-top: 20px;
  }
  &__notice {
    margin-top: 20px;
  }
}
</style>
