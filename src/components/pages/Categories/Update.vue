<template>
  <app-category-update
    :access="access"
    :disabled="loading"
    :category="newNmaeIdCategory"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @update-value="updateValue($event)"
    @clear-message="clearMessage"
    @up-date-category="updateCategory"
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
      return this.$store.state.category.category;
    },
    errorMessage() {
      return this.$store.state.category.errorMessage;
    },
    doneMessage() {
      return this.$store.state.category.doneMessage;
    },
    newNmaeIdCategory() {
      return this.$store.state.category.newNmaeIdCategory.name;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('category/getUpdateCategory', id);
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
