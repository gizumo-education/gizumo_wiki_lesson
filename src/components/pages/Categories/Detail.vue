<template>
  <app-category-detail
    :category="category"
    :access="access"
    :disabled="loading"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @update-value="updateValue"
    @edit-category="editCategory"
  />
</template>

<script>
import { CategoryDetail } from '@Components/molecules';

export default {
  components: {
    appCategoryDetail: CategoryDetail,
  },
  computed: {
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      return this.$store.state.categories.category;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    const id = this.$route.params;
    this.$store.dispatch('categories/getCategory', id);
    this.$store.dispatch('categories/resetView');
  },
  methods: {
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('categories/updateCategory', target);
    },
    editCategory() {
      this.$store.dispatch('categories/editCategory', {
        id: this.category.id,
        name: this.category.name,
      });
    },
  },
};
</script>
