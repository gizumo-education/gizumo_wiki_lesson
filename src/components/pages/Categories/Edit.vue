<template>
  <app-category-edit
    :category-id="categoryId"
    :category-title="categoryTitle"
    :loading="loading"
    :done-message="doneMessage"
    :access="access"
    @edited-category-title="editedCategoryTitle"
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
    categoryId() {
      let { id } = this.$route.params;
      id = this.$route.params.id;
      return id;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryTitle() {
      return this.$store.state.categories.categoryTitle;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryTitle', this.$route.params.id);
  },
  methods: {
    editedCategoryTitle($event) {
      this.$store.dispatch('categories/editedCategoryTitle', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', this.$route.params.id);
    },
  },
};
</script>
