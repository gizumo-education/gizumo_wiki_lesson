<template>
  <app-category-edit
    :error-message="errorMessage"
    :done-message="doneMessage"
    :target-category="targetCategory"
    :loading="loading"
    :access="access"
    @clear-message="clearMessage"
    @editing-name="editingName"
    @handle-submit="handleSubmit"
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
    targetCategory() {
      return this.$store.state.categories.targetCategory;
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
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    editingName($event) {
      this.$store.dispatch('categories/editingName', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', {
        id: this.targetCategory.id,
        /* eslint-disable-next-line no-irregular-whitespace */
        name: this.targetCategory.name.replace(/(　)+/, ' ').trim(),
      });
    },
  },
};
</script>
