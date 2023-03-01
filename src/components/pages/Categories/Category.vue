<template>
  <div class="category">
    <app-category-post
      class="category-form"
      :access="access"
      :category="categoryName"
      :done-message="completeMessage"
      :not-done-message="incompleteMessage"
      :disabled="callLoading"
      @handle-submit="addCategory"
      @update-value="categoryName = $event.target.value"
    />
    <app-category-list
      class="category-list"
      :categories="categories"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      categoryName: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoriesList;
    },
    // categories() のような形でcomputedを追加メッセージ
    completeMessage() {
      return this.$store.state.categories.doneMessage;
    },
    // カテゴリーが追加できませんでした、メッセージ
    incompleteMessage() {
      return this.$store.state.categories.notDoneMessage;
    },
    // loading呼ぶ categories.jsのstateからloadingもってくる
    callLoading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllLists');
  },
  methods: {
    addCategory() {
      this.$store.dispatch('categories/getCategoryName', this.categoryName);
      this.categoryName = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display:flex;
}
.category-form {
  flex-basis:30%;
}
.category-list {
  flex-basis:70%;
}
</style>
