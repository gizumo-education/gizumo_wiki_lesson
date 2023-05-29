<template>
  <div>
    <app-category-edit
      :access="access"
      :disabled="loading"
      :edit-id="editId"
      :category="categoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @edit-click="editCategory"
      @edit-value="editValue"
    />
  </div>
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
    editId() {
      const id = parseInt(this.$route.params.id, 10);
      return id;
    },
    categoryName() {
      return this.$store.state.categories.category;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getCategory', this.editId);
  },
  methods: {
    editCategory({ id, name }) {
      this.$store.dispatch('categories/clearMessage');
      this.$store.dispatch('categories/editCategory', { id, name });
    },
    editValue(event) {
      this.$store.dispatch('categories/editValue', event.target.value);
    },
  },
};
</script>

<style>
</style>
