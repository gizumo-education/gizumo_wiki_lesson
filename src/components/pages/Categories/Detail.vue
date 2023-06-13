<template>
  <app-category-detail
    caution-message="※ 名前以外の文頭・文末・文中の全角・半角スペースは削除されます。"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :category="category"
    :disabled="loading ? true : false"
    :access="access"
    @clear-message="clearMessage"
    @update-value="updateValue"
    @edit-category="editCategory"
  />
</template>

<script>
import { CategoryDetail } from '@Components/molecules';

export default {
  components: {
    appCategoryDetail: CategoryDetail,
  },
  computed: {
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
    category() {
      return this.$store.state.categories.targetCategory;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', { id });
    this.$store.dispatch('categories/clearMessage');
  },
  destroyed() {
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('categories/updateValue', target.value);
    },
    editCategory() {
      this.$store.dispatch('categories/editCategory', {
        id: this.category.id,
        name: this.category.name,
      });
    },
  },
};
</script>
