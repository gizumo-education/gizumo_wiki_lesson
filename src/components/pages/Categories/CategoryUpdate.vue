<template>
  <div class="articles">
    <app-category-update
      class="list"
      :category-id="categoryId"
      :category-title="categoryTitle"
      :category-content="categoryContent"
      :disabled="loading"
      :access="access"
      :error-message="errorMessage"
      :category="category"
      :done-message="doneMessage"
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
