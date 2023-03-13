<template>
  <div>
    <app-category-post />
    <app-category-list
      :categories="categoryList"/>
  </div>
  </template>
  
  <script>
  import CategoryList from '@Components/molecules/CategoryList/index.vue';
  import CategoryPost from '@Components/molecules/CategoryPost/index.vue'
  
  export default {
    components: {
      appCategoryList: CategoryList,
      appCategoryPost: CategoryPost,
    },
    created() {
      this.$store.dispatch('categories/getAllCategories');
    },
    computed: {
      categoryList() {
        return this.$store.state.categories.categoryList
      }
    }
  };
  </script>