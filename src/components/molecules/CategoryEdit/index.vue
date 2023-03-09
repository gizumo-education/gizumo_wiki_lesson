<template>
  <div>
    <app-heading :level="1">
      カテゴリー管理
    </app-heading>
    <app-router-link
      to="/categories"
      underline
      hover-opacity
      class="category-edit__list-link"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      :value="selectedCategoryName"
      required
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-edit__update-button"
      round
      @click="$emit('click', $event)"
    >
      更新
    </app-button>
  </div>
</template>

<script>
import {
  Button, Heading, RouterLink, Input,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appRouterLink: RouterLink,
    appInput: Input,
  },
  computed: {
    selectedCategoryName() {
      return this.$store.state.categories.selectedCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', this.$route);
  },
};
</script>

<style lang="scss" scoped>
.category-edit__list-link {
  margin-top: 16px;
}
.category-edit__update-button {
  margin-top: 16px;
}
</style>
