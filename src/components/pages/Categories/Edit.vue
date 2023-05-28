<template>
  <div class="category">
    <app-category-Edit
      :category="targetCategory"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      class="category-form"
      @handle-submit="editCategory"
      @update-value="updatedCategory"
    />
  </div>
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
      id = parseInt(id, 10);
      return id;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    targetCategory() {
      return this.$store.state.categories.targetCategory;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getCategory', parseInt(this.categoryId, 10));
  },
  methods: {
    updatedCategory($event) {
      this.$store.dispatch('categories/updatedCategory', $event.target.value);
    },
    editCategory() {
      if (this.disabled) return;
      this.$store.dispatch('categories/editCategory', parseInt(this.categoryId, 10));
    },
  },
};
</script>
