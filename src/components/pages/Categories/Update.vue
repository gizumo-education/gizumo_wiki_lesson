<template>
  <div>
    <app-category-update>
      class="category-update"
      :category="targetCategory"
    </app-category-update>
  </div>
</template>

<script>
import { CategoryUpdate } from '@Components/molecules';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>
