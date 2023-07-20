<template>
  <app-category-edit
    :category="category"
    :disabled="isLoading"
    :access="access"
    :done-message="doneMessage"
    :error-message="errorMessage"
    @clear-message="clearMessages"
    @handle-submit="handleSubmit"
    @update-value="updateValue"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    category() {
      return this.$store.state.categories.category;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', id);
    this.$store.commit('categories/clearMessages');
  },
  methods: {
    clearMessages() {
      this.$store.dispatch('categories/clearMessages');
    },
    updateValue(value) {
      if (!this.isLoading) this.$store.dispatch('categories/updateValue', value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/updateCategory', this.category);
    },
  },
};
</script>

<style scoped>
</style>
