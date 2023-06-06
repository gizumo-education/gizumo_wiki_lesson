<template>
  <div class="category">
    <app-category-post
      class="category_post"
      :category="category"
      :access="access"
      :disabled="loading"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category_list"
      :access="access"
      :theads="theads"
      :categories="categoryList"
      :delete-category-name="deleteCategoryName"
      :error-message="errorMessage"
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
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      category: '',
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateValue(event) {
      this.category = event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      const categoryName = this.category;
      this.$store.dispatch('categories/addCategory', categoryName).then(() => {
        this.category = '';
      });
    },
    openModal(categoryId, categoryName) {
      this.toggleModal();
      const categoryInfo = {
        id: categoryId,
        name: categoryName,
      };
      this.$store.dispatch('categories/confirmDeleteCategory', categoryInfo);
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &_post {
    width: 30%;
    border-right: 1px solid $separator-color;
    padding-right: 15px;
  }
  &_list {
    width: 70%;
    padding-left: 15px;
  }
}
</style>
