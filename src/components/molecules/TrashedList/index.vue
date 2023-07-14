<template>
  <div class="articles-list">
    <app-heading :level="1">削除済み記事一覧</app-heading>

    <div class="articles-list__back">
      <app-router-link
        to="/articles?page=1"
        hover-opacity
        small
        white
        round
        bg-lightgreen
      >
        すべての記事一覧へ戻る
      </app-router-link>
    </div>
  </div>
</template>

<script>
import { RouterLink, Heading } from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appHeading: Heading,
  },
};
</script>

<style lang="scss" scoped>
.articles-list {
  &__back {
    margin-top: 20px;
  }
}
</style>
