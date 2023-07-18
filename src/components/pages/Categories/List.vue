<template>
  <div class="list-contents">
    <app-category-post
      :category="Category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      class="list-content list-post"
    />
    <app-category-list
      :categories="categoriesList"
      class="list-content list-list"
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
  beforeRouteUpdate(to, from, next) {
    this.fetchCategories();
    next();
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
    category() {
      return this.$store.state.categories.category;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    disabled() {
      return this.$store.state.categories.disabled;
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
      if (this.$route.query.categories) {
        const { category } = this.$route.query;
        this.title = category;
      } else {
        this.$store.dispatch('getAllCategories');
      }
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
