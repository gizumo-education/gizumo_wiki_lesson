<template>
  <div class="categories">
    <app-category-post
      class="categories-post"
      :access="access"
      :category="newCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @update-value="newCategory = $event.target.value"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="categories-list"
      :access="access"
      :categories="categoryList"
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
      title: 'すべて',
      newCategory: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('categories/postCategory', this.newCategory);
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  height: 100%;
  &-post {
    padding-right: 2%;
    width: 40%;
    border-right: 1px solid #ccc;
  }
  &-list {
    margin-left: 2%;
    width: 60%;
    overflow-y: scroll;
    background-color: #fff;
  }
}
</style>
