<template>
  <div class="articles">
    <app-category-update
      class="list"
      :category-id="categoryId"
      :category-name="categoryName"
      :access="access"
      :loading="loading"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
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
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
    handleSubmit() {
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    editValue(event) {
      this.$store.dispatch('categories/editValue', event.target.value);
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
