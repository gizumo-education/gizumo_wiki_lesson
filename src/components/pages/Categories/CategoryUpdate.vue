<template>
  <div class="articles">
    <app-category-update
      class="list"
      :access="access"
      :error-message="errorMessage"
      :category-name="categoryName"
      :done-message="doneMessage"
      :disabled="disabled"
      @update-value="$emit('update-value', $event)"
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
    categoryName() {
      return this.$store.state.categories.updateCategory.name;
    },
    categoryId() {
      return parseInt(this.$route.params.id, 10);
    },
    updateCategory() {
      return this.$store.state.categories.updateCategory;
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
