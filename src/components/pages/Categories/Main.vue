<template>
  <div class="category__main">
    <div class="category__main__post">
      <app-category-post
        :category="category"
        :error-message="errorMessage"
      />
    </div>
    <div class="category__main__list">
      <app-category-list
        :theads="theads"
        :categories="categoriesList"
        :access="access"
      />
    </div>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],

  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
    };
  },

  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },

  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
  .category__main {
    display: flex;

    &__post {
      width: 30%;
      padding-right: 20px;
    }
    &__list {
      width: 70%;
      height: 800px;
      overflow: scroll;
      padding: 0 20px;
      border-left: 2px solid $separator-color;
    }
  }

</style>
