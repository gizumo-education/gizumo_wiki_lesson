<template>
  <div class="categories">
    <app-category-post
      :category="category"
      :access="access"
    />
    <app-category-list
      :categories="categoryList"
      :access="access"
      :done-message="doneMessage"
      :theads="theads"
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
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      return this.$store.state.categories.category;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategories');
  },
};
</script>
<style lang="scss" scoped>
.categories {
  display: flex
};

.categories form {
  width: 350px;
  flex-shrink: 0;
  position: relative;
  padding-right:20px ;
};

.categories form::after {
  position: absolute;
  top: 0;
  left: 100%;
  content: "";
  width: 1px;
  height: 100%;
  background-color: rgb(181, 181, 181);;
};
</style>
