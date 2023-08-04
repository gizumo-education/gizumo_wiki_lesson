<template>
  <div class="categories-list-mask">
    <div class="categories-list-mask-input">
      <app-category-post
        :done-message="doneMessage"
        :error-message="errorMessage"
        :category="newCategoryName"
        :access="access"
        :disabled="loading"
        @update-value="updateNewCategoryName"
        @handle-submit="createCategory"
        @clear-message="clearMessage"
      />
    </div>
    <div class="categories-list-mask--confirm">
      <app-category-list
        :theads="theads"
        :categories="categoriesList"
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
    categoriesList() {
      return this.$store.state.category.categoryList;
    },
    doneMessage() {
      return this.$store.state.category.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.category.loading;
    },
    errorMessage() {
      return this.$store.state.category.errorMessage;
    },
    deleteCategoryName() {
      return this.$store.state.category.deleteCategory.name;
    },
  },
  created() {
    this.$store.dispatch('category/getAllCategories');
    this.$store.dispatch('category/clearMessage');
  },
  methods: {
    openModal(categoryId, categoryName) {
      this.$store.dispatch('category/confirmDeleteCategory', {
        categoryId,
        categoryName,
      });
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('category/deleteCategory').then(() => {
        this.$store.dispatch('category/getAllCategories');
      });
      this.toggleModal();
    },
    createCategory() {
      this.$store.dispatch('category/loading', true);
      this.$store.dispatch('category/createCategory', this.newCategoryName)
        .then(() => {
          this.newCategoryName = '';
        });
    },
    updateNewCategoryName(event) {
      this.newCategoryName = event.target.value;
    },
    getAllCategories() {
      this.$store.dispatch('category/getAllCategories');
    },
    clearMessage() {
      this.$store.dispatch('category/clearMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-list-mask {
  display: flex;
  justify-content: space-between;
  &-input {
    width: 30%;
    padding-right: 20px;
    border-right: 1px solid #eaeaea;
  }
  &--confirm {
    width: 70%;
    padding-left: 20px;
  }
}
</style>
