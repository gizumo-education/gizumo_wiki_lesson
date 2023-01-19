<template>
  <div class="categories">
    <app-category-post
      class="categories-post"
      :access="access"
      :value="category"
      :done-message="doneMessage"
      :category="categoryName"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
      @clear-message="clearMessage"
    />
    <app-category-list
      class="categories-list"
      :theads="theads"
      :categories="categoriesList"
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
      category: {
        name: '',
      },
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
    categoryName() {
      return this.category.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    emptyInput() {
      return {
        name: '',
      };
    },
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    updateValue($event) {
      this.category.name = $event.target.value;
    },
    handleSubmit() {
      const inputName = this.category.name;
      this.$store.dispatch('categories/postCategory', inputName);
      this.category = this.emptyInput();
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
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
      width: 50%;
      border-right: 1px solid #ccc;
    }
    &-list {
      margin-left: 2%;
      width: 48%;
      overflow-y: scroll;
      background-color: #fff;
    }
  }
</style>
