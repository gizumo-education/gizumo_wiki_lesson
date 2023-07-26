<template>
  <app-category-edit
    :category-id="categoryId"
    :error-message="errorMessage"
    :loading="loading"
    :done-message="doneMessage"
    :access="access"
    :category="categoryName"
    @edited-name="editedName($event)"
    @handle-submit="handleSubmit"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    categoryName() {
      return this.$store.state.categories.editCategory.name;
    },
    currentCategoryName() {
      const { name } = this.$store.state.categories.editCategory.category;
      return name;
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
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', parseInt(this.categoryId, 10));
  },
  methods: {
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
