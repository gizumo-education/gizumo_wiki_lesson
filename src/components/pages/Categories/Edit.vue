<template>
  <div>
    <app-category-edit
      :category="targetCategoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :is-loading="isLoading"
      @update-value="updateValue"
      @click="updateCategoryName"
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
    this.$store.dispatch('categories/getCategoryDetails', this.$route);
  },
  destroyed() {
    this.$store.dispatch('categories/inputTargetCategoryName', '');
  },
  methods: {
    updateValue(event) {
      this.$store.dispatch(
        'categories/inputTargetCategoryName',
        event.target.value,
      );
    },
    updateCategoryName() {
      this.$store.dispatch('categories/updateTargetCategoryName');
    },
  },
};
</script>

<style lang="scss" scoped></style>
