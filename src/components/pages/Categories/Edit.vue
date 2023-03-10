<template>
  <app-category-edit
    :category-id="categoryId"
    :category-list="categoryList"
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
  data() {
    return {
      title: '',
    };
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
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
  },
  created() {
    this.$store.dispatch('categories/getAllLists');
    this.$store.dispatch('categories/getAllLists', parseInt(this.categoryId, 10));
  },
  methods: {
    editedCategoryTitle($event) {
      this.$store.dispatch('categories/editedCategoryTitle', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
