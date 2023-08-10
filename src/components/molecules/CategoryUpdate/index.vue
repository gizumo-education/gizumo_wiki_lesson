<template>
  <div class="category-update">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      :to="`/categories`"
      underline
      hover-opacity
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      class="category-update__input"
      name="category"
      type="text"
      :value="categoryName"
    />
    <app-button
      class="category-update__button"
      round
    >
      更新
    </app-button>
  </div>
</template>

<script>
import {
  RouterLink, Heading, Input, Button,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
  },
  props: {
    updateCategory: {
      type: String,
      default: '',
    },
    categoryName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.category-update {
  .router-link {
    padding-top: 16px;
  }
  &__input {
    margin-top: 16px;
  }
  &__button {
    margin-top: 16px;
  }
}
</style>
