<template>
  <div>
    <app-Category-Post />
    <app-Category-List
      :theads="theads"
      :target-array="categoriesList"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    CategoryList,
  },
};

</script>
