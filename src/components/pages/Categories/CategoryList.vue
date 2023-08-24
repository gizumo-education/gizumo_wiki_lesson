<template>
  <div>
    <app-Category-List
      :appCategoryList="CategoryList"
    />
    <app-Category-Post
      :appCategoryPost="CategoryPost"
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
};

</script>
