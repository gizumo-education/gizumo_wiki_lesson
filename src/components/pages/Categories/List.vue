<template>
  <div class="category">
    <app-category-post
      class="category-post"
      category=""
      :access="access"
    />
    <app-category-list
      :categories="categoryList"
      :theads="theads"
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
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &-post{
    height: 100%;
    width: 40%;
    padding-right: 20px;
  }
  &-list{
    height: 100%;
    width: 60%;
    border-left: 1px solid $separator-color;
    padding-left: 10px;
  }
  &__table{
    margin-top: 20px;
  }
}
</style>
