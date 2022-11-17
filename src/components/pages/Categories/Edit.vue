<template>
  <app-category-edit
    :category-name="categoryName"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :disabled="isLoading"
    :access="access"
    @edited-name="editedName"
    @update-category="updateCategory"
    @clear-message="clearMessage"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryName() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
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
    this.$store.dispatch('categories/initCategory');
    this.$store.dispatch('categories/getCategories', this.$route.params.id);
  },
  methods: {
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    updateCategory() {
      if (this.isLoading) return;
      this.$store.dispatch('categories/updateCategory');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>
