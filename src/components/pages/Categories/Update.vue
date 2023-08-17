<template>
  <div>
    <app-category-update
      class="category-update"
      :category-id="categoryId"
      :category-name="categoryName"
      :access="access"
      :disabled="disabled"
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
      return parseInt(this.$route.params.id, 10);
    },
    disabled() {
      return this.$store.state.categories.disabled;
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
    this.$store.dispatch('categories/getUpdateCategory', this.categoryId);
  },
  methods: {
    editName($event) {
      this.$store.dispatch('categories/editName', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch(
        'categories/updateCategory',
        {
          id: this.updateCategory.id,
          name: this.updateCategory.name,
        },
      );
    },
  },
};
</script>
