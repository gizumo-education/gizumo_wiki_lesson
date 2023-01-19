<template>
  <div class="category-page">
    <div class="columns">
      <app-category-post
        :error-message="errorMessage"
        :done-message="doneMessage"
        :access="access"
      />
    </div>
    <div class="columns">
      <app-category-list
        :theads="theads"
        :categories="categoriesList"
        :access="access"
      />
    </div>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoriesList() {
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
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.category-page {
  display: flex;
  height: 100%;
}
.columns {
  width: 50%;
  &:first-child {
    border-right: 1px solid #ccc;
    padding-right: 2%;
  }
}

</style>
