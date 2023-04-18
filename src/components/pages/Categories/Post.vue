<template>
  <app-category-post
    :category="targetCategory"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :disabled="disabled"
    :access="access"
    @hundle-submit="addCategory"
  />
</template>

<script>
import { CategoryPost } from '@Components/molecules';

export default {
  components: {
    AppCategoryPost: CategoryPost,
  },
  computed: {
    targetCategory() {
      return this.$store.state.category.targetCategory;
    },
    errorMessage() {
      return this.$store.state.category.errorMessage;
    },
    doneMessage() {
      return this.$store.state.category.doneMessage;
    },
    disabled() {
      return true;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
};
</script>

<style>

</style>
