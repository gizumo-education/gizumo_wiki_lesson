<template>
  <div class="category-page">
    <app-category-post
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      class="category-page__post"
    />
    <div class="category-page__list">
      <app-category-list
        :theads="theads"
        :access="access"
        :categories="categoryList"
      />
    </div>>
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('categories/filteredCategories', category)
          .then(() => {
            if (this.$store.state.categories.categoryList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('categories/getAllCategories');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.category-page {
  display: flex;
  &__post {
    border-right: 2px solid #ccc;
    padding-right: 2%;
    width: 40%;
  }
  &__list {
    padding-left: 2%;
    white-space: nowrap;
  }
}
</style>
