<template>
  <div class="category">
    <app-category-Post
      :access="access"
      :error-message="errorMessage"
    />
    <app-category-list
      :theads="theads"
      :categories="categories"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  width: 100%;
}

.category-form{
  width: 35%;
  padding-right: 20px;
}
.category-list {
  padding-left: 20px;
  width: 65%;
  border-left: 2px solid #eaeaea;
}
</style>
