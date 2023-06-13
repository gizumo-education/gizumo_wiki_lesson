<template>
  <app-category-edit
    :category="category"
    :access="access"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :disabled="loading ? true : false"
    @clear-message="clearMessage"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', { id });
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      this.$store.dispatch('categories/updateCategory', this.category);
    },
    updateValue(value) {
      if (!this.loading) this.$store.dispatch('categories/updateValue', value);
    },
  },
};
</script>
