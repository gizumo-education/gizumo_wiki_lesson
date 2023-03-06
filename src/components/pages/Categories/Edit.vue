<template>
  <app-category-edit
    :edit-category-error-message="editCategoryErrorMessage"
    :edit-category-done-message="editCategoryDoneMessage"
    :disabled="isLoading"
    :category="category"
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
    category() {
      return this.$store.state.categories.category;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', id).then(() => {
      this.$store.dispatch('categories/editCategoryClearMessage');
    });
  },
  methods: {
    editedCategory($event) {
      this.editTargetCategory.name = $event.target.value;
    },
    editCategory() {
      const { id } = this.$route.params;
      this.$store.dispatch('categories/editCategory', {
        id,
        name: this.editTargetCategory.name,
      });
    },
  },
};
</script>
