<template>
  <div>
    <p>動的ルーティング</p>
    <app-category-edit />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
};
</script>

<style lang="scss" scoped></style>
