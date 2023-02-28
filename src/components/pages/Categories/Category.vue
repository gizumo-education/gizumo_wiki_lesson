<template>
  <section class="category-flex">
    <div class="category-post-pages">
      <app-category-post
        :access="access"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :category="targetCategory.name"
        :disabled="isLoading"
        @update-value="targetCategory.name = $event.target.value"
        @clear-message="clearMessage"
        @handle-submit="createCategory"
      />
    </div>
    <div class="category-list-pages">
      <app-category-list
        :categories="categoryList"
        :theads="theads"
        :access="access"
        :delete-category-name="deleteCategoryName"
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
  // beforeRouteUpdate(to, from, next) {
  // this.fetchCategory();
  // next();
  // },
  data() {
    return {
      theads: ['カテゴリー名'],
      targetCategory: {
        name: '',
      },
      deleteCategory: {
        id: '',
        name: '',
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.categories.isLoading;
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
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    createCategory() {
      if (this.isLoading) return;
      this.$store.dispatch('categories/createCategory', {
        name: this.targetCategory.name,
      }).then(() => {
        this.targetCategory.name = null;
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    openModal(categoryId, categoryName) {
      this.deleteCategory.id = categoryId;
      this.deleteCategory.name = categoryName;
      this.$store.dispatch('categories/modalCategory', { categoryId, categoryName });
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory', this.deleteCategory.id)
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
        });
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
  .category-flex {
    display: flex;
  }
  .category-post-pages {
    width: 30%;
    padding-right: 30px;
  }
  .category-list-pages {
    width: 70%;
    padding-left: 30px;
    border-left: 2px solid $separator-color;
  }
</style>
