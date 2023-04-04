<template>
  <app-category-edit
    :category-title="categoryTitle"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
};
</script>
