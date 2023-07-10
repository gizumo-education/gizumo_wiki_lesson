<template>
  <div>
    <app-category-post
      class="category_post"
      :access="access"
      :category="targetCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :clear-message="clearMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category_list"
      :categories="categoriesList"
      :access="access"
      :theads="theads"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

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
      return this.$store.state.categories.categoriesList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    targetCategory() {
      return this.$store.state.categories.targetCategory.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    clearMessage() {
      this.store.dispatch('categories/clearMassage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory');
      // if (this.loading) return;
      // this.$store.dispatch('categories/postCategory').then(() => {
      //   this.$router.push({
      //     path: '/categories',
      //     query: { redirect: '/article/post' },
      //   });
      // });
    },
  },
};

</script>

<style lang="scss" scoped>
  .category_post {
    float: left;
    width: 40%;
    margin-right: 20px;
  }
  .category_list {
    border-left: 2px solid $separator-color;
  }
  .category_list.category-list {
    padding: 10px 0 20px 20px;
  }
</style>
