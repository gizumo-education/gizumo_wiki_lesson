<template>
  <div class="article-trashed">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <div class="article-trashed__back">
      <app-router-link
        :to="{ path: '/articles', query: { page: 1 } }"
        hover-opacity
        small
        white
        round
        bg-lightgreen
      >
        全ての記事一覧へ戻る
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
.article-trashed {
  &__back {
    margin-top: 20px;
  }
}
</style>
