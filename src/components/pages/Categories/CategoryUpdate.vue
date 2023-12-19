<template>
  <div class="articles">
    <app-category-update
      class="list"
      :category-id="categoryId"
      :category-name="categoryName"
      :access="access"
      :loading="loading"
      :update-category="updateCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @edited-name="editedName"
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
  computed: {
    categoryId() {
      return parseInt(this.$route.params.id, 10);
    },
    categoryName() {
      return this.$store.state.categories.targetCategory.name;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    updateCategory() {
      return this.$store.state.categories.updateCategory;
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
  created() {
    this.$store.dispatch('categories/getAllCategories', this.categoryName);
    this.$store.dispatch('categories/getUpdateCategory', this.categoryId);
  },
  methods: {
    // handleSubmit() {
    //   if (this.loading) return;
    //   this.$store.dispatch('categories/updateCategory');
    // },
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch(
        'categories/updateCategory',
        {
          id: this.updateCategory.id,
          name: this.updateCategory.name,
        },
      );
    },
    // editValue(event) {
    //   this.$store.dispatch('categories/editValue', event.target.value);
    // },
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
