<template>
  <div class="category-area">
    <app-category-post
      :category="XXXCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
    />
    <app-category-list
      :theads="tHeads"
      :categories="categories"
      :delete-category-name="デリートカテゴリーネーム"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      access: {
        create: true,
        delete: true,
      },
      tHeads: ['カテゴリー名'],
      categories: [
        { id: 0, name: 'みかん' },
        { id: 1, name: 'りんごid1' },
        { id: 2, name: 'ぱいなっぷるid2' },
      ],
    };
  },
  computed: {
    doneMessage() {
      return this.$store.state.doneMessage;
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
  },
};
</script>

<style lang="scss" scoped>
.category-area {
  display: flex;
  & > div {
    width: 70%;
  }
  & > form {
    width: 30%;
  }
}
</style>
