<template>
  <div class="category">
    <app-category-post
      class="category__post"
      :disabled="loading"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :category="targetCategory.name"
      @update-value="targetCategory.name = $event.target.value"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      :theads="theads"
      :categories="categoryList"
      class="category__list"
      :access="access"
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
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
      targetCategory: {
        name: '',
      },
      deleteCategoryName: '',
      deleteCategoryId: null,
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      const categoryName = this.targetCategory.name;
      this.$store.dispatch('categories/postCategory', categoryName)
        .then(() => {
          this.targetCategory.name = '';
          this.$store.dispatch('categories/getAllCategories');
        });
    },
    openModal(categoryId, categoryName) {
      this.deleteCategoryName = categoryName;
      this.deleteCategoryId = categoryId;
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory', this.deleteCategoryId);
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scope>
.category {
  display: flex;
  justify-content: space-around;
  &__post{
    width: 30%;
    padding-right: 10px;
  }
  &__list{
    width: 70%;
    border-left: 2px solid #eaeaea;
    padding-left: 10px;
  }
}
</style>
