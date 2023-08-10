<template>
  <div>
    <app-category-update
      class="category-update"
      :category-name="categoryName"
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
      const id = parseInt(this.$route.params.id, 10);
      return id;
    },
  },
  created() {
    this.$store.dispatch('categories/getUpdateCategory', parseInt(this.categoryId, 10));
  },
};
</script>
