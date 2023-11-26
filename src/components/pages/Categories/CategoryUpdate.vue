<template>
  <div class="articles">
    <app-category-update
      class="list"
      :access="access"
      :error-message="errorMessage"
      :category-name="categoryName"
      :done-message="doneMessage"
      :disabled="disabled"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
  </div>
</template>

<script>
import { CategoryUpdate } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
  },
  mixins: [Mixins],
  data() {
    return {
      categoryName: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  methods: {
    updateValue(event) {
      this.category = event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('category/updateCategory');
    },
  },
};
</script>

<style lang="scss" scoped>
  .articles {
    display: flex;
    writing-mode: lr-tb;
  }
  .list {
    flex-basis: 60%;
    padding-left: 2%;
  }
</style>
