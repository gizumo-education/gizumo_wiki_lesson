<template>
  <div class="">
    <app-category-update
      :access="access"
      :loading="loading"
      :category="rikonameid"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @update-value="updateValue($event)"
      @clear-message="clearMessage"
      @up-date-category="updateCategory"
    />
  </div>
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
    rikonameid() {
      return this.$store.state.category.upCategory.name;
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
