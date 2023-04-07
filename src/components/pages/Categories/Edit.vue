<template>
  <app-category-edit
    :category="targetCategory"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :access="access"
    :loading="loading"
    @clear-message="clearMessage"
    @update-value="updateCategoryName"
    @handle-submit="editedCategoryName"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    targetCategory() {
      return this.$store.state.categories.targetCategory;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getTargetCategory', this.$route.params.id);
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategoryName($event) {
      this.$store.dispatch('categories/updateCategoryName', $event.target.value);
    },
    editedCategoryName(editedCategory) {
      if (this.loading) return;
      this.$store.dispatch('categories/editedCategoryName', editedCategory);
    },
  },
};
</script>
