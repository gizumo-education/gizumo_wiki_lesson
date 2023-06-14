<template>
  <app-category-edit
    :error-message="errorMessage"
    :done-message="doneMessage"
    :category="category"
    :disabled="loading"
    :access="access"
    @clear-message="clearMessage"
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
      return this.$store.state.categories.targetCategory;
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
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('categories/updateValue', target.value);
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
