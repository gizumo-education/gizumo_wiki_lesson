<template>
  <div>
    <app-category-post
      class="category_post"
      :access="access"
      :category="targetCategory"
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
      return this.$store.state.categories.targetCategory.title;
    }
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  method: {
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    // handleSubmit() {
    //   console.log("押された");
      // if (this.loading) return;
      // this.$store.dispatch('categories/postCategory').then(() => {
      //   this.$router.push({
      //     path: '/categories',
      //     query: { redirect: '/article/post' },
      //   });
      // });
    // },
    handleSubmit() {
      console.log('実行')
    },
  }

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
