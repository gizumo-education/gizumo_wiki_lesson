<template>
  <app-category-edit
    :category-id="categoryId"
    :current-category-name="currentCategoryName"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :access="access"
    :disabled="disabled"
    :category="updateName"
    @handle-submit="handleSubmit"
    @update-value="updateValue"
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
      id = parseInt(id, 10);
      return id;
    },
    currentCategoryName() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    updateName() {
      return this.$store.state.categories.updateName.name;
    },
    newCategoryName() {
      const { name } = this.$store.state.categories.newCategory;
      return name;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategory', this.categoryId);
  },
  methods: {
    handleSubmit() {
      if (this.currentCategoryName === this.newCategoryName) {
        this.$store.dispatch('categories/showMessage');
      } else {
        this.$store.dispatch('categories/editCategory');
      }
    },
    updateValue(event) {
      const updateName = event.target.value;
      this.$store.dispatch('categories/updateValue', updateName);
    },
  },
};
</script>
