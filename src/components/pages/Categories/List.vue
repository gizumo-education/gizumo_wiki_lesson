<template>
  <div class="categories">
    <app-category-post
      class="categories-post"
      :access="access"
      :error-message="errorMessage"
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
      name: '',
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
      return this.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    emptyInput() {
      this.name = '';
    },
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    updateValue($event) {
      this.name = $event.target.value;
    },
    handleSubmit() {
      const inputName = this.name;
      this.$store.dispatch('categories/postCategory', inputName);
      this.name = this.emptyInput();
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
