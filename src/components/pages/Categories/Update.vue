<template>
  <app-category-update
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
import { CategoryUpdate } from '@Components/molecules';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
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
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      const categoryName = this.category;
      this.$store.dispatch('categories/updateCategory', categoryName);
    },
    updateValue(value) {
      if (!this.loading) this.$store.dispatch('categories/updateValue', value);
    },
  },
};
</script>
