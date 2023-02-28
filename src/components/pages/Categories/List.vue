<template>
  <div>
    <app-category-post
      :category="カテゴリー名_Categories_Listvueにあります"
      :error-message="エラーメッセージProps"
      :done-message="ダンメッセージProps"
      :access="access"
    />
    <app-category-list
      :theads="tHeads"
      :categories="categories"
      :delete-category-name="デリートカテゴリーネーム"
      :access="access"
    />
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
        delete: false,
      },
      tHeads: ['みかん', 'みかん', 'みかん'],
      categories: [
        { id: 0, name: 'みかん' },
        { id: 1, name: 'りんごid1' },
        { id: 2, name: 'ぱいなっぷるid2' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
