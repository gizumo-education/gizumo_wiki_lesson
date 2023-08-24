<template>
  <div class="categories">
    <app-category-Post
      class="categories__post"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :category="categoryName"
      :access="access"
    />
    <app-category-List
      class="categories__list"
      :categories="categoryList"
      :access="access"
      :theads="theads"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoryName() {
      return this.$store.getters['categories/getCategory'];
    },
    categoryList() {
      return this.$store.getters['categories/transformedCategories'];
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
    doneMessage() {
      return this.$store.state.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>
<style lang="scss" scoped>
.categories {
  display: flex;
  justify-content: space-between;
  &__post {
    padding-right: 30px;
    width: 45%;
  }
  &__list {
    padding-left: 30px;
    border-left: 1px solid $separator-color;
    width: 100%;
  }
  &__list::-webkit-scrollbar{
  display:none;
}
}
</style>
