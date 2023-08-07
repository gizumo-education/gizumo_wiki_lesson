<template>
  <app-category-update
    :access="access"
    :disabled="loading"
    :category="category"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @update-value="updateValue($event)"
    @clear-message="clearMessage"
    @update-category="updateCategory"
  />
</template>

<script>
import CategoryUpdate from '@Components/molecules/CategoryUpdate/index.vue';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.category.loading;
    },
    category() {
      return this.$store.state.category.category.name;
    },
    errorMessage() {
      return this.$store.state.category.errorMessage;
    },
    doneMessage() {
      return this.$store.state.category.doneMessage;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('category/getCategory', id);
    this.$store.dispatch('category/clearMessage');
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('category/updateValue', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('category/clearMessage');
    },
    updateCategory() {
      this.$store.dispatch('category/updateCategory');
    },
  },
};
</script>
