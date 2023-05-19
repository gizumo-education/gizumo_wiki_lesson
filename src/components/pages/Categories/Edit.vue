<template>
  <app-category-edit
    :access="access"
    :loading="loading"
    :category-name="categoryName"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :disabled="loading ? true : false"
    :button-text="buttonText"
    @clear-message="clearMessage"
    @update-value="updateValue"
    @handle-submit="handleSubmit"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  mixins: [Mixins],
  computed: {
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryName() {
      const { name } = this.$store.state.categories.targetCategory.category;
      return name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    buttonText() {
      return this.disabled ? '更新' : '更新中...';
    },
  },
  created() {
    this.$store.dispatch('categories/getCategory', this.$route.params.id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', this.$route.params.id);
    },
    updateValue(event) {
      if (
        !this.loading
      ) this.$store.dispatch('categories/updateValue', event.target.value);
    },
  },
};
</script>
