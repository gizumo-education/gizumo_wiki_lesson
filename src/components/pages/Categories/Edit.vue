<template>
  <app-category-edit
    :edit-category-error-message="editCategoryErrorMessage"
    :edit-category-done-message="editCategoryDoneMessage"
    :edit-target-category-name="editTargetCategory.name"
    :disabled="isLoading"
    :access="access"
    @edited-category="editedCategory"
    @edit-category="editCategory"
    @update-value="editedCategory"
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
      editTargetCategory: {
        id: '',
        name: '',
      },
    };
  },
  computed: {
    editCategoryErrorMessage() {
      return this.$store.state.categories.editCategoryErrorMessage;
    },
    editCategoryDoneMessage() {
      return this.$store.state.categories.editCategoryDoneMessage;
    },
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', { id }).then(() => {
      this.editTargetCategory = { id, name: this.$store.state.categories.category.name };
      this.$store.dispatch('categories/clearMessage');
    });
  },
  methods: {
    editedCategory($event) {
      this.editTargetCategory.name = $event.target.value;
    },
    editCategory() {
      this.$store.dispatch('categories/editCategory', {
        id: this.editTargetCategory.id,
        /* eslint-disable-next-line no-irregular-whitespace */
        name: this.editTargetCategory.name.replace(/(　)+/, ' ').trim(),
      });
    },
  },
};
</script>
