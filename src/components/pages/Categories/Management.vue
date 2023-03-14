<template>
  <div class="category-inner">
    <app-category-post
      class="app-category-post"
      :access="access"
    />
    <div class="app-category-list">
      <app-category-list
        :categories="categoryList"
        :access="access"
        :theads="theads"
      >
        カテゴリー名
      </app-category-list>
    </div>
  </div>
</template>
<script>
import CategoryList from '@Components/molecules/CategoryList/index.vue';
import CategoryPost from '@Components/molecules/CategoryPost/index.vue';

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
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss">
.category-inner {
  display: flex;
  width: 100%;
}
.app-category-post {
  width: 100%;
  border-right: 1px solid #eaeaea;
  padding: 0 20px 0 0;

}
.app-category-list {
  width: 100%;
  padding: 0 0 0 20px;
}
</style>
