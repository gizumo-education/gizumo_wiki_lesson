<template>
  <app-category-edit
    :access="access"
    :loading="loading"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :category-name="categoryName"
    @handle-submit="handleSubmit"
    @edited-category="editedCategory"
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
      category: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    categoryId() {
      const id = parseInt(this.$route.params.id, 10);
      return id;
    },
    categoryName() {
      return this.$store.state.categories.updateCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', this.categoryId);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    editedCategory($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
