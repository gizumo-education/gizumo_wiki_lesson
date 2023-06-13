<template>
  <div class="wrapper">
    <div class="wrapper__post">
      <app-category-post
        :category="categoryName"
        :access="access"
        :done-message="doneMessage"
        :error-message="errorMessage"
        :disabled="loading"
        @update-value="updateValue"
        @handle-submit="handleSubmit"
      />
    </div>
    <div class="wrapper__list">
      <app-category-list
        :access="access"
        :categories="categories"
        :theads="theads"
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
    };
  },
  computed: {
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryName() {
      return this.$store.state.categories.category.name;
    },
    categories() {
      return this.$store.state.categories.categoryList;
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
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/initCategory');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmDeleteCategory', {
        id: categoryId,
        name: categoryName,
      });
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.toggleModal();
      });
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
  },
};

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  &__post {
    flex-basis: 35%;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid $separator-color;
  }
  &__list {
    flex-grow: 1;
  }
}
</style>
