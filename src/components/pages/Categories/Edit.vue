<template>
  <app-category-edit
    @update-value="updateValue"
    @click="updateCategoryNameAPI"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
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
