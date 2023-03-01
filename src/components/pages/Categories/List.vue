<template>
  <div class="category-area">
    <app-category-post
      :category="category"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
    />
    <app-category-list
      :theads="tHeads"
      :categories="categories"
      :delete-category-name="'未実装（20230301現在）'"
      :access="access"
      @open-modal="openModal"
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
  computed: {
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    category() {
      return this.$store.state.articles.categoryPostInputValue;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    tHeads() {
      return this.$store.state.articles.tHeads;
    },
    categories() {
      return this.$store.state.articles.categories;
    },
  },
  created() {
    this.$store.dispatch('articles/getAllCategories');
  },
  methods: {
    openModal() {
      // console.log('openModal Called');
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
