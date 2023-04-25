<template>
  <app-category-edit
    :category="categoryName"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :disabled="disabled"
    :access="access"
    @update-value="updatedCategory"
    @handle-submit="handleSubmit"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    AppCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    categoryName() {
      const name = this.$store.state.categories.targetCategory;
      return name;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getCategory', parseInt(this.categoryId, 10));
  },
  methods: {
    updatedCategory($event) {
      this.$store.dispatch('categories/updatedCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.disabled) return;
      this.$store.dispatch('categories/editCategory', parseInt(this.categoryId, 10));
    },
  },
};
</script>
