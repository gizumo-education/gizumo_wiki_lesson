<template>
  <div class="display: flex">
    <app-category-post class="left"
      :access="access"
    />

    <app-category-list class="right"
      :theads="theads"
      :categories="categoryList"
      :access="access"
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
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoriesList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
}
.right{
  width: 60%;
  margin-left: 2%;
}
.left{
  width: 40%;
  border-right: 1px solid ;
  padding-right: 2%;
}
</style>
