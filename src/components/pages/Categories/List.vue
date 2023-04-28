<template>
  <div class="categories">
    <article class="categories__content">
      <app-category-post
        class="category-post"
        :category="categoryName.category"
        :access="access"
        :disabled="loading"
        :error-message="errorMessage"
        @edited-category="editedCategory"
        @handle-submit="handleSubmit"
      />
      <app-category-list
        class="list-items"
        :theads="theads"
        :categories="categoryList"
        :access="access"
      />
    </article>
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
      categoryName: {
        id: null,
        category: '',
      },
    };
  },
  computed: {
    categoryList() {
      return this.$store.getters['categories/categoryList'];
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/initPostCategory');
  },
  methods: {
    editedCategory($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.$store.dispatch('categories/initPostCategory');
      });
    },
  },
};

</script>

<style lang="scss" scoped>
.categories__content {
  display: flex;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
.category-post {
  width: 40%;
  padding: 0 10px;
}
.list-items {
  width: 60%;
  padding-left: 10px;
  border-left: solid #c0c0c0 1px;
}
</style>
