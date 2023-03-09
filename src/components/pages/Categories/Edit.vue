<template>
  <div>
    <app-category-edit
      :error-message="errorMessage"
      :done-message="doneMessage"
      @update-value="updateValue"
      @click="updateCategoryNameAPI"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  methods: {
    updateValue(event) {
      // 注意！呼んでいるのは"updateCategoryName"です！！！！
      this.$store.dispatch('categories/updateCategoryName', event.target.value);
    },
    updateCategoryNameAPI() {
      this.$store.dispatch('categories/updateCategoryNameAPI');
    },
  },
};
</script>

<style lang="scss" scoped></style>
