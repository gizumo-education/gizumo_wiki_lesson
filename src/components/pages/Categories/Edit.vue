<template>
  <app-category-edit
    :access="access"
    :category="category"
    :disabled="disabled"
    :done-message="doneMessage"
    :error-message="errorMessage"
    @clear-edited-value="clearEditedValue"
    @update-value="updateValue"
    @edit-category="editCategory"
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
    category() {
      return this.$store.state.categories.category.name;
    },
    categoryId() {
      return parseInt(this.$route.params.id, 10);
    },
    currentCategoryName() {
      return this.$store.state.categories.category.name;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', this.categoryId);
  },
  methods: {
    clearEditedValue() {
      this.$store.dispatch('categories/clearEditedValue');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    editCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/editCategory');
    },
  },
};
</script>
