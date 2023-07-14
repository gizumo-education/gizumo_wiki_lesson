<template>
  <div class="category">
    <div class="category-post">
      <app-category-post
        :access="access"
        :category="newCategoryName"
        :disabled="isLoading"
        :error-message="errorMessage"
        :done-message="doneMessage"
        @clear-message="clearMessage"
        @update-value="updateNewCategoryName"
        @handle-submit="createCategory"
      />
    </div>
    <div class="category-separator" />
    <div class="category-list">
      <app-category-list
        :theads="theads"
        :categories="categories"
        :access="access"
        :delete-category-name="deleteCategoryName"
        @open-modal="openModal"
        @handle-click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
      newCategoryName: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories;
    },
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/fetchCategories');
    this.$store.commit('categories/clearMessages');
  },
  methods: {
    openModal(categoryId, categoryName) {
      this.$store.dispatch(
        'categories/confirmDeleteCategory',
        { categoryId, categoryName },
      );
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.toggleModal();
      });
    },
    updateNewCategoryName(event) {
      this.newCategoryName = event.target.value;
    },
    createCategory() {
      this.$store.commit('categories/setIsLoading', true);
      this.$store.dispatch('categories/createCategory', this.newCategoryName);
      this.newCategoryName = '';
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessages');
    },
  },
};
</script>

<style scoped>
.category {
  display: flex;
}
.category-post {
  width: 40%;
}
.category-list {
  width: 100%;
}
.category-separator {
  width: 1px;
  background-color: #ccc;
  margin: 0 16px;
}
</style>
