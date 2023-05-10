<template>
  <app-category-edit
    :category-name="categoryName"
    :loading="loading"
    :done-message="doneMessage"
    :access="access"
    :error-message="errorMessage"
    @edit-value="editValue"
    @handle-submit="handleSubmit"
  />
</template>

<script>
import CategoryEdit from '@Components/molecules/CategoryEdit/index.vue';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryId() {
      return parseInt(this.$route.params.id, 10);
    },
    categoryName() {
      return this.$store.state.categories.editCategory.name;
    },
    editCategoryName() {
      return this.$store.state.categories.targetCategory.category.name;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.editDoneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessagePost;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', (this.categoryId, 10));
  },
  methods: {
    editValue($event) {
      const editCategory = $event.target.value;
      this.$store.dispatch('categories/editValue', editCategory);
    },
    handleSubmit() {
      if (this.categoryName === this.editCategoryName) {
        this.$store.dispatch('categories/showMessage');
      } else {
        this.$store.dispatch('categories/updateCategory');
      }
    },
  },
};
</script>
