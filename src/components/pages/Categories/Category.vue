<template>
  <div class="category">
    <app-category-post
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      :access="access"
      @selected-article-category="selectedArticleCategory"
      @edited-title="editedTitle"
      @edited-content="editedContent"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      :theads="theads"
      :categories="categoriesList"
      :delete-category-nam="deleteCategoryNam"
      :access="access"
    />
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
    // loading() {
    //   return this.$store.state.categories.loading;
    // },
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
    // updateValue($event) {
    //   this.$store.dispatch('categories/updateValue', $event.target.value);
    // },
    // selectedArticleCategory($event) {
    //   const categoryName = $event.target.value ? $event.target.value : '';
    //   this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    // },
    // handleSubmit() {
    //   if (this.loading) return;
    //   this.$store.dispatch('categories/postCategories').then(() => {
    //     this.$router.push({
    //       path: '/categories',
    //       query: { redirect: '/category/post' },
    //     });
    //   });
    // },
    // fetchCategories() {
    //   if (this.$route.query.category) {
    //     const { category } = this.$route.query;
    //     this.title = category;
    //     this.$store.dispatch('categories/filteredCategories', category)
    //       .then(() => {
    //         if (this.$store.state.categories.categoryList.length === 0) {
    //           this.$router.push({ path: '/notfound' });
    //         }
    //       }).catch(() => {
    //         // console.log(err);
    //       });
    //   } else {
    //     this.$store.dispatch('categories/getAllCategories');
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    height: 100%;
  //   &-list {
  //   display: flex;
  //   height: 100%;
  //   &-editor {
  //     padding-right: 2%;
  //     width: 50%;
  //     border-right: 1px solid #ccc;
  //   }
  //   &-preview {
  //     margin-left: 2%;
  //     width: 48%;
  //     overflow-y: scroll;
  //     background-color: #fff;
  //   }
  //   &-form {
  //     margin-top: 20px;
  //   }
  // }
}
</style>
