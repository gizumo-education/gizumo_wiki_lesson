<template>
  <div class="category">
    <app-category-post
      :access="access"
      :error-message="errorMessage"
      :category="targetCategory"
      :disabled="disabled"
      :done-message="doneMessage"
      class="category_post"
      @update-value="setTargetCategory"
      @clear-message="clearMessage"
      @handle-submit="addCategory"
    />
    <app-category-list
      :access="access"
      :theads="theads"
      :categories="categories"
      :delete-category-name="deleteCategoryName"
      class="category_list"
      @open-modal="openModal"
      @handle-click="deleteCategory"
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
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    targetCategory() {
      return this.$store.state.categories.targetCategory;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    setTargetCategory($event) {
      this.$store.dispatch('categories/setTargetCategory', $event.target.value);
    },
    addCategory() {
      this.$store.dispatch('categories/addCategory');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    openModal(categoryId, categoryName) {
      const confirmCategory = {
        id: categoryId,
        name: categoryName,
      };
      this.$store.dispatch('categories/confirmDeleteCategory', confirmCategory);
      this.toggleModal();
    },
    deleteCategory() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getCategories');
      });
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &_post {
    width: 30%;
  }
  &_list {
    padding: 0 20px;
    margin-left: 20px;
    width: 70%;
    border-left: 2px solid #E8E8E8;
  }
}
</style>
