<template>
  <div class="category">
    <app-category-post
      class="category__post"
      :category="category"
      :access="access"
      @update-value="updateValue"
    />
    <app-category-list
      class="category__list"
      :categories="categoriesList"
      :theads="theads"
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
  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    // category() {
    //   const { title } = this.$store.state.categories.targetCategory;
    //   return title;
    // },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    // this.$store.dispatch('categories/postAddCategory');
  },
  methods: {
    updateValue($event) {
      this.category = $event.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  &__post {
    float: left;
    width: 35%;
    padding-right: 20px;
  }
  &__list {
    border-left: 1px solid #e0e0e0;
    padding-left: 19px;
    overflow: hidden;
  }
}
</style>
