<template>
  <app-category-edit
    :category-id="categoryId"
    :category-name="categoryName"
    :loading="loading"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :access="access"
    @edited-category-name="editedCategoryName"
    @handle-submit="handleSubmit"
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
      title: '',
      content: '',
    };
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    categoryName() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
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
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/getCategoryName', parseInt(this.categoryId, 10));
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    editedCategoryName($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
