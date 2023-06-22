<template>
  <app-category-edit
    :loading="loading"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :access="access"
    :edit-detail="editDetail"
    @handle-submit="updateCategory"
    @update-value="inputCategory"
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
    editDetail() {
      return this.$store.state.categories.editDetail;
    },
  },
  created() {
    this.$store.dispatch('categories/editDetail', this.categoryId);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    inputCategory(target) {
      if (!this.loading) this.$store.dispatch('categories/inputCategory', target);
    },
    updateCategory() {
      this.$store.dispatch('categories/updateCategory', this.categoryId);
    },
  },
};
</script>
