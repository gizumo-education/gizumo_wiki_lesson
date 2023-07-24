<template>
  <div class="list-contents">
    <app-category-post
      :access="access"
      class="list-content list-post"
    />
    <app-category-list
      :categories="categoriesList"
      class="list-content list-list"
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
    };
  },
  computed: {
    categoriesList() {
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
      this.$store.dispatch('getAllCategories');
    },
  },
};
</script>

<style lang="scss" scoped>

.list-contents {
  display: flex;
}

.list-post {
  width:40%;
  border-right: 1px solid #ccc;
  padding-right: 20px;
}

.list-list {
  width: 60%;
  padding-left: 20px;
}
</style>
