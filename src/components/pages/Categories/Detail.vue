<template>
  <div>
    <category-detail
      :category-id="categoryId"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      :category="category"
      :loading="loading"
      :disabled="loading ? true: false"
      @clear-message="clearMessage"
      @handle-submit="handleSubmit"
      @edited-category="editedCategory"
    />
  </div>
</template>

<script>
import CategoryDetail from '@Components/molecules/CategoryDetail/index.vue';

export default {
  components: {
    categoryDetail: CategoryDetail,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    selectCategoryName() {
      const selectCategoryName = this.$store.state.categories.targetCategory.name;
      return selectCategoryName;
    },
    categoryId() {
      const { id } = this.$route.params;
      return id;
    },
    category() {
      const category = this.$store.state.categories.targetCategory.name;
      return category;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', parseInt(this.categoryId, 10));
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', parseInt(this.categoryId, 10));
    },
    editedCategory($event) {
      this.$store.dispatch('categories/editedContent', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
