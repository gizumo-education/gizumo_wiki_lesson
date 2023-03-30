<template>
  <section class="categories">
    <div class="categories__post__form">
      <app-category-post
        :error-message="errorMessage"
        :done-message="doneMessage"
        :access="access"
        :category="category"
        :disabled="loading ? true : false"
        @clear-message="clearMessage"
        @handle-submit="addCategory"
        @update-value="updateValue"
      />
    </div>
    <div class="categories__list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :category-id="categoryId"
        :category-name="categoryName"
        :error-message="errorMessage"
        :access="access"
        @open-modal="openModal"
        @handle-submit="deleteCategory"
      />
    </div>
  </section>
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
      category: '',
      categoryName: '',
      categoryId: null,
    };
  },
  computed: {
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategoryList');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(event) {
      this.category = event.target.value;
    },
    addCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/addCategory', this.category);
      this.category = '';
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/modalDeleteCategory', categoryId, categoryName);
      this.toggleModal();
    },
    deleteCategory() {

    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
    &__post__form {
        width: 40%;
    }
    &__list {
      padding: 10px 20px;
      margin-left: 20px;
      border-left: 1px solid $separator-color;
    }
}
</style>
