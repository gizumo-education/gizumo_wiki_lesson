<template>
  <div
    :class="categoryObject"
  >
    <app-category-post
      :class="classPostObject"
      :access="access"
    />
    <app-category-list
      :class="classListObject"
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
      categoryObject: {
        'is-category': true,
      },
      classPostObject: {
        'is-post': true,
      },
      classListObject: {
        'is-list': true,
      },
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.is-category {
  display: flex;
  .is-post {
    margin-right: 20px;
    width: calc(100% - 65%);
  }
  .is-list {
    padding-left: 20px;
    width: calc(100% - 35%);
    border-left: solid 1px rgb(217, 216, 216);
  }
}
</style>
