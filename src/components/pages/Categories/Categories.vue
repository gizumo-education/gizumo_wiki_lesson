<template>
  <div class="category-page">
    <app-category-post
      :access="access"
      :category="category"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :disabled="disabled"
      class="category-page__post"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <div class="category-page__list">
      <app-category-list
        :theads="theads"
        :access="access"
        :categories="categoryList"
        :delete-category-name="deleteCategoryName"
        @handle-click="handleClick"
        @open-modal="openModal"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      return this.$store.state.categories.category.name;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    deleteCategoryName() {
      return this.$store.state.categories.categoryDetail.deleteCategoryName;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.fetchCategories();
    this.clearEditedValue();
  },
  methods: {
    clearEditedValue() {
      this.$store.dispatch('categories/clearEditedValue');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
      this.$store.dispatch('categories/getAllCategories');
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategories');
    },
    openModal(categoryId, categoryName) {
      const categoryDetail = { categoryId, categoryName };
      this.$store.dispatch('categories/confirmDeleteCategory', categoryDetail);
      this.toggleModal();
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.category-page {
  display: flex;
  &__post {
    border-right: 2px solid #ccc;
    padding-right: 2%;
    width: 30%;
  }
  &__list {
    padding-left: 2%;
    white-space: nowrap;
    width: 70%;
  }
}
</style>
