<template>
  <app-category-edit
    :error-message="errorMessage"
    :done-message="doneMessage"
    :edit-category-name="editCategoryName"
    :loading="loading"
    :access="access"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
      name: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    editCategoryName() {
      const { name } = this.$store.state.categories.editCategory;
      return name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', { id });
    this.$store.dispatch('categories/clearMessage');
  },
};
</script>
