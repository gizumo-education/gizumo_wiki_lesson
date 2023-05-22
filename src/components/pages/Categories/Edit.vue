<template>
  <app-category-edit
    :category-id="categoryId"
    :category-name="categoryName"
    :loading="loading"
    :done-message="doneMessage"
    :access="access"
    @editing-category-name="editedName"
    @handle-submit="handleSubmit"
  />
</template>

<script>
import CategoryEdit from '@Components/molecules/CategoryEdit/index.vue';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    categoryName() {
      return this.$store.state.categories.targetCategory.name;
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
    this.$store.dispatch('categories/setTargetCategory', this.categoryId);
  },
  methods: {
    editedName($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
