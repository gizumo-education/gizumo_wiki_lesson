<template>
  <div>
    <app-category-post
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
    />
    <app-category-list />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      category: 'カテゴリー名',
      errorMessage: 'エラーメッセージProps',
      doneMessage: 'ダンメッセージProps,',
      access: {
        create: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
