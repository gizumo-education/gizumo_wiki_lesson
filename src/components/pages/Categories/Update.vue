<template>
  <app-category-update
    :error-message="errorMessage"
    :done-message="doneMessage"
    :category="category"
    :disabled="loading"
    :access="access"
    @clear-message="clearMessage"
    @update-value="updateValue"
    @update-category="updateCategory"
  />
</template>

<script>
import { CategoryUpdate } from '@Components/molecules';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
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
      return this.$store.state.categories.category;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', id);
    this.$store.dispatch('categories/clearMessage');
  },
  destroyed() {
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($eventTarget) {
      this.$store.dispatch('categories/updateValue', $eventTarget.value);
    },
    updateCategory() {
      this.$store.dispatch('categories/updateCategory', {
        id: this.category.id,
        name: this.category.name,
      });
    },
  },
};

</script>
