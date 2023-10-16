<template>
  <div class="articles">
    <app-category-post
      class="form"
      :loading="loading"
      :access="access"
      :error-message="errorMessage"
      :category="getCategoryName"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="list"
      :theads="theads"
      :categories="categoryList"
      :done-message="doneMessage"
      :loading="loading"
      :access="access"
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
      theads: ['カテゴリー名'],
      category: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    getCategoryName() {
      return this.$store.getters['categories/getCategory'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .articles {
    display: flex;
    writing-mode: lr-tb;
  }
  .form {
    flex-basis: 40%;
    border-right: 1px solid #ccc;
    padding-right: 2%;
  }
  .list {
    flex-basis: 60%;
    padding-left: 2%;
  }
  .td {
    padding: 40%;
  }
</style>
