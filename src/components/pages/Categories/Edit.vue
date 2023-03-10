<template>
  <div>
    <app-category-edit
      :category="targetCategoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :is-loading="isLoading"
      @input-target-category-name="inputTargetCategoryName"
      @handle-submit="handleSubmit"
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
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    targetCategoryName() {
      return this.$store.state.categories.targetCategory.name;
    },
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetails', this.$route.params.id);
  },
  destroyed() {
    this.$store.dispatch('categories/inputTargetCategoryName', '');
  },
  methods: {
    inputTargetCategoryName(event) {
      this.$store.dispatch(
        'categories/inputTargetCategoryName',
        event.target.value,
      );
    },
    handleSubmit() {
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>

<style lang="scss" scoped></style>
