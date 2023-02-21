<template>
  <app-category-edit
    :category-title="categoryTitle"
    :loading="loading"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :access="access"
    @handle-submit="handleSubmit"
    @edited-title="editedTitle"
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
    };
  },
  computed: {
    categoryTitle() {
      const title = this.$store.state.categories.targetCategory.name;
      return title;
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
    this.$store.dispatch('categories/clearMessage');
    let { id } = this.$route.params;
    id = parseInt(id, 10);
    this.$store.dispatch('categories/reflectCategory', id);
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      this.$store.dispatch('categories/updateCategory', id);
    },
    editedTitle($event) {
      this.$store.dispatch('categories/editedTitle', $event.target.value);
    },
  },
};
</script>
