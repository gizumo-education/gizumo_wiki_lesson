<template>
  <div>
    <app-category-post
      class="category_post"
      :access="access"
      :category="targetCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :disabled="disabled"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category_list"
      :categories="categoriesList"
      :access="access"
      :theads="theads"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :delete-category-name="deleteCategoryName"
      @open-modal="openModal"
      @handle-click="handleClick"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
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
    categoriesList() {
      return this.$store.state.categories.categoriesList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    targetCategory() {
      return this.$store.state.categories.targetCategory.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
    deleteCategoryId() {
      return this.$store.state.categories.deleteCategoryId;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.store.dispatch('categories/clearMassage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory');
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch(
        'categories/confirmDeleteCategory',
        { categoryId, categoryName },
      );
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory', { id: this.deleteCategoryId })
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
        });
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
  .category_post {
    float: left;
    width: 40%;
    margin-right: 20px;
  }
  .category_list {
    border-left: 2px solid $separator-color;
  }
  .category_list.category-list {
    padding: 10px 0 20px 20px;
  }
</style>
