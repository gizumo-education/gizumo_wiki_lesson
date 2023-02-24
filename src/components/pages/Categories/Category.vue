<template>
  <div class="category__main">
    <div class="category__main__post">
      <app-category-post
        :category="category"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :access="access"
        @update-value="updateValue"
        @handle-submit="postCategory"
      />
    </div>
    <div class="category__main__list">
      <app-category-list
        :theads="theads"
        :categories="categoriesList"
        :access="access"
        :delete-category-name="deleteCategory.name"
        @handle-click="handleClick"
        @open-modal="openModal"
      />
    </div>
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
      category: '',
      deleteCategory: {
        id: '',
        name: '',
      },
    };
  },

  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
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
  },

  methods: {
    updateValue(event) {
      this.category = event.target.value;
    },
    postCategory() {
      this.$store.dispatch('categories/postCategory', this.category);
      this.category = '';
    },
    openModal(categoryId, categoryName) {
      this.deleteCategory = {
        id: categoryId,
        name: categoryName,
      };
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory', this.deleteCategory.id);
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
  .category__main {
    display: flex;

    &__post {
      width: 30%;
      padding-right: 20px;
    }
    &__list {
      width: 70%;
      height: 800px;
      overflow: scroll;
      padding: 0 20px;
      border-left: 2px solid $separator-color;
    }
  }

</style>
