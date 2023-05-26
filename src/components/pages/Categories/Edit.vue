<template>
  <div>
    <app-category-edit
      :edit-id="editId"
      :edit-category-name="editCategoryName"
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
    editId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    editCategoryName() {
      return this.$store.state.categories.editCategory.name;
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
    this.$store.dispatch('categories/getEditCategory', parseInt(this.editId, 10));
  },
  methods: {
    editCategory(editId, editCategoryName) {
      this.$store.dispatch('categories/clearMessage');
      this.$store.dispatch('categories/editCategory', { editId, editCategoryName });
    },
    editValue(event) {
      this.$store.dispatch('categories/editValue', event.target.value);
    },
  },
};
</script>

<style>
</style>
