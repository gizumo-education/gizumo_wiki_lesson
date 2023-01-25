<template>
  <div class="category-page">
    <div class="category-page__post">
      <app-category-post
        :error-message="errorMessage"
        :done-message="doneMessage"
        :access="access"
        :disabled="loading"
        :category="categoryName"
        @update-value="updateValue"
        @handle-submit="handleSubmit"
        @clear-message="clearMessage"
      />
    </div>
    <div class="category-page__list">
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

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
      categoryName: '',
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue($event) {
      this.categoryName = $event.target.value;
    },
    handleSubmit() {
      const targetCategoryName = this.categoryName;
      this.$store.dispatch('categories/postCategory', targetCategoryName);
      this.categoryName = '';
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
.category-page {
  display: flex;
  height: 100%;
  &__post {
    width: 50%;
    border-right: 1px solid #ccc;
    padding-right: 2%;
  }
  &__list {
    margin-left: 2%;
    width: 48%;
    overflow-y: scroll;
    background-color: #fff;
  }
}

</style>
