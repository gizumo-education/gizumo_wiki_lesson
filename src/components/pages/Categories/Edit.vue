<template>
  <div>
    <app-category-edit
      :access="access"
      :disabled="disabled"
      :category-name="categoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @update-value="setEditCategory"
      @clear-message="clearMessage"
      @handle-submit="putCategory"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    categoryName() {
      return this.$store.state.categories.targetEditCategory.name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getEditCategory', this.$route.params.id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    setEditCategory($event) {
      this.$store.dispatch('categories/setEditCategory', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    putCategory() {
      this.$store.dispatch('categories/putCategory');
    },
  },
};
</script>
