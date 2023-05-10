<template>
  <app-category-edit
    :access="access"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :category="category"
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
    access() {
      return this.$store.getters['auth/access'];
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
    category() {
      return this.$store.state.categories.category;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', { id });
    this.$store.dispatch('categories/clearMessage');
  },
  destroyed() {
    this.clearMessage();
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
