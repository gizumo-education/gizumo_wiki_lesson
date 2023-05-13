<template>
  <div class="category">
    <app-category-post
      :access="access"
      :error-message="errorMessage"
      :category="newCategory"
      class="category_post"
      @update-value="addCategory"
      @create-category="createCategory"
    />
    <app-category-list
      :access="access"
      :theads="theads"
      :categories="categories"
      class="category_list"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    newCategory() {
      return this.$store.state.categories.newCategory;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategories');
  },
  methods: {
    addCategory($event) {
      this.$store.dispatch('categories/addCategory', $event.target.value);
    },
    createCategory() {
      this.$store.dispatch('categories/createCategory');
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &_post {
    width: 30%;
  }
  &_list {
    padding: 0 20px;
    margin-left: 20px;
    width: 70%;
    border-left: 2px solid #E8E8E8;
  }
}
</style>
