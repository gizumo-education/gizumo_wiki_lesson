<template>
  <div class="article-trashed">
    <appHeading :level="1">削除済み記事一覧</appHeading>
    <div class="article-trashed__back">
      <appRouterLink
        :to="{ path: '/articles', query: { page: 1 } }"
        hover-opacity
        small
        white
        round
        bg-lightgreen
      >
        全ての記事一覧へ戻る
      </appRouterLink>
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
