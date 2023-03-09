<template>
  <app-category-edit @update-value="updateCategoryName" />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  methods: {
    updateCategoryName(event) {
      this.$store.dispatch('categories/updateCategoryName', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
