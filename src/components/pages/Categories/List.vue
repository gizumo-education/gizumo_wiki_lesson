<template>
  <div class="category">
    <app-category-post
      class="category-post"
      :category="targetCategory"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="isLoading"
      :access="access"
      @handle-submit="handleSubmit"
      @update-value="uptargetCategory"
      @clear-message="clearMessage"
    />
    <app-category-list
      class="category-list"
      :categories="categoriesList"
      :delete-category-name="deleteCategoryName"
      :theads="theads"
      :access="access"
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
      targetCategory: '',
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
    isLoading() {
      return this.$store.state.categories.disabled;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      if (this.isLoading) return;
      this.$store.dispatch('categories/postCategories', this.targetCategory).then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    uptargetCategory(event) {
      this.targetCategory = event.target.value;
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmDeleteCategories', {
        categoryId, categoryName,
      });
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategories').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  height: 100%;
  &-post {
    padding-right: 2%;
    width: 40%;
    border-right: 1px solid #ccc;
  }
  &-list {
    margin-left: 2%;
    width: 60%;
    overflow-y: scroll;
    background-color: #fff;
  }
}
</style>
