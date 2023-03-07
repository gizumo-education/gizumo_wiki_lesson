<template>
  <div class="category-area">
    <app-category-post
      :category="category"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      @clear-message="clearMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      :theads="theads"
      :categories="categories"
      :access="access"
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
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    category() {
      return this.$store.state.categories.category;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories;
    },
    deleteCategoryName() {
      return this.$store.state.categories.selectedCategory.categoryName;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(event) {
      this.$store.dispatch('categories/updateValue', event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/handleSubmit');
    },
    openModal(categoryId, categoryName) {
      // eslint-disable-next-line max-len
      this.$store.dispatch('categories/selectCategory', { categoryId, categoryName });
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.category-area {
  display: flex;
  & > div {
    width: 70%;
  }
  & > form {
    width: 30%;
    padding-right: 15px;
  }
}
</style>
