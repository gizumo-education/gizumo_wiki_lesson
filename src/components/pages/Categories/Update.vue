<template>
  <div>
    <app-category-update
      class="category-update"
      :category-id="categoryId"
      :category-name="categoryName"
      :access="access"
      :loading="loading"
      :update-category="updateCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @edit-name="editName"
      @handle-submit="handleSubmit"
    />
  </div>
</template>

<script>
import { CategoryUpdate } from '@Components/molecules';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
  },
  computed: {
    categoryName() {
      return this.$store.state.categories.updateCategory.name;
    },
    categoryId() {
      const id = parseInt(this.$route.params.id, 10);
      return id;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    updateCategory() {
      return this.$store.state.categories.updateCategory;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getUpdateCategory', parseInt(this.categoryId, 10));
  },
  methods: {
    editName($event) {
      this.$store.dispatch('categories/editName', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch(
        'categories/updateName',
        {
          id: this.updateCategory.id,
          name: this.updateCategory.name,
        },
      );
    },
  },
};
</script>
