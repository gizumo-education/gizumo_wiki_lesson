<template>
  <section class="category-content">
    <div class="category-content__post">
      <app-category-post
        :error-message="errorMessage"
        :done-message="doneMessage"
        :category="category"
        :access="access"
        @clear-message="clearMessage"
        @update-value="updateValue"
        @handle-submit="handleSubmit"
      />
    </div>
    <div class="category-content__list">
      <app-category-list
        :categories="categoryList"
        :theads="theads"
        :delete-category-name="deleteCategoryName"
        :access="access"
        @open-modal="openModal"
        @handle-click="handleClick"
      />
    </div>
  </section>
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
      deleteCategory: {
        id: null,
        name: '',
      },
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.category = $event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/createCategory', this.category).then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.category = '';
      });
    },
    openModal(categoryId, categoryName) {
      this.toggleModal();
      this.deleteCategory = {
        id: categoryId,
        name: categoryName,
      };
      this.$store.dispatch('categories/clearMessage');
      this.$store.dispatch('categories/confirmDeleteCategory', this.deleteCategory);
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory', { id: this.deleteCategory.id })
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
        });
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.category-content {
  display: flex;
  &__post {
    width: 35%;
    padding-right: 20px;
    border-right: 1px solid #ccc;
  }
  &__list {
    width: 65%;
    height: 680px;
    overflow: hidden;
    padding-left: 20px;
  }
}
</style>
