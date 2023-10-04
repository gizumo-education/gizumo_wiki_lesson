<template>
  <div class="categories">
    <app-category-Post
      class="categories__post"
      :category="categoryName"
      :error-message="errorMessage"
      :disabled="disabled"
      :done-message="doneMessage"
      :access="access"
      @clear-message="clearMessage"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <app-category-List
      class="categories__list"
      :categories="categoryList"
      :access="access"
      :theads="theads"
      :delete-category-name="deleteCategoryName"
      @open-modal="openModal"
      @handle-click="handleClick"
    />
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
    categoryName() {
      const { name } = this.$store.state.categories.category;
      return name;
    },
    categoryList() {
      return this.$store.getters['categories/transformedCategories'];
    },
    disabled() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory');
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmDeleteCategoryId', categoryId);
      this.$store.dispatch('categories/confirmDeleteCategoryName', categoryName);
      this.toggleModal();
    },
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
