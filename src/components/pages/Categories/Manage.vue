<template>
  <div class="category-manage">
    <app-category-post
      class="category-post"
      :done-message="doneMessage"
      :access="access"
      :category="category"
      :error-message="errorMessage"
      @update-value="updateValue"
      @clear-message="clearMessage"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      :theads="theads"
      :categories="categoriesList"
      :error-message="errorMessage"
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
      theads: ['カテゴリー名', '', '', ''],
      category: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoriesList() {
      return this.$store.state.categories.categoriesList;
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
    this.$store.dispatch('categories/getCategoryList');
  },
  methods: {
    updateValue(event) {
      this.category = event.target.value;
    },
    clearMessage() {
      return this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      if (this.loading) return;
      const categoryName = this.category;
      this.$store.dispatch('categories/addCategory', categoryName);
      this.category = '';
    },
    openModal(categoryId, categoryName) {
      this.toggleModal();
      const categoryIdName = {
        id: categoryId,
        name: categoryName,
      };
      this.$store.dispatch('categories/confirmDeleteCategory', categoryIdName);
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.category-manage {
  display: flex
}
.category-post {
  width: 30%;
  border-right: 1px solid $separator-color;
  padding-right: 20px;
}
.category-list {
  width: 70%;
  padding-left:20px;
}
</style>
