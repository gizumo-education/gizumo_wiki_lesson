<template>
  <div class="Trashed">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="Trashed__btn"
    >
      すべての記事一覧へ戻る
    </app-router-link>
  </div>
</template>

<script>
import {
  Heading,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
  },
};
</script>

<style lang="scss" scoped>
.Trashed {
  &__btn {
    margin-top: 16px;
  }
}
</style>
