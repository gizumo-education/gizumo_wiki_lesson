<template>
  <app-category-edit
    :access="access"
    :category-name="categoryName"
    :disabled="loading"
    :done-message="doneMessage"
    :error-message="errorMessage"
    @edited-category="editedCategory"
    @handle-submit="handleSubmit"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    categoryName() {
      return this.$store.state.categories.category.name;
    },
  },
  created() {
    this.clearMessage();
    this.$store.dispatch('categories/getCategory', {
      id: this.$route.params.id,
    });
  },
  methods: {
    editedCategory($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', {
        id: this.$store.state.categories.category.id,
        name: this.$store.state.categories.category.name,
      });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>
