<template>
  <div class="categories">
    <app-category-detail
      class="categories__detail"
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="loading ? true : false"
      :access="access"
      @update-value="updateValue"
      @handle-Click="handleClick"
      @edit-category="editCategory"
    />
  </div>
</template>

<script>
import { CategoryDetail } from '@Components/molecules';

export default {
  components: {
    appCategoryDetail: CategoryDetail,
  },
  computed: {
    category() {
      return this.$store.state.categories.category;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    categoryName() {
      return this.$store.state.categories.category.name;
    },
  },
  created() {
    const id = this.$route.params;
    this.$store.dispatch('categories/getCategory', id);
    this.$store.dispatch('categories/clearMessage');
  },
  destroyed() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/deleteValue');
  },
  methods: {
    handleClick(updateCategoryName) {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', updateCategoryName);
    },
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('categories/updateValue', target);
    },
    editCategory() {
      this.$store.dispatch('categories/editCategory', {
        id: this.category.id,
        name: this.category.name,
      });
      console.log(this.category.id);
      console.log(this.category.name);
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
