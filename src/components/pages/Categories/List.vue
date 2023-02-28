<template>
  <div>
    <app-category-post
      :category="カテゴリー名_Categories_Listvueにあります"
      :error-message="エラーメッセージProps"
      :done-message="ダンメッセージProps"
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
      access: {
        create: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
