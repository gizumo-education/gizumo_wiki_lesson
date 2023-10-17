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
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', { id });
    this.$store.dispatch('categories/clearMessage');
    console.log(id);
  },
  destroyed() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/deleteValue');
  },
  methods: {
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('categories/updateValue', target);
    },
    editCategory() {
      this.$store.dispatch('categories/editCategory', {
        id: this.category.id,
        /* eslint-disable-next-line no-irregular-whitespace */
        name: this.category.name.replace(/(　)+/, ' ').trim(),
      });
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
