<template>
  <div class="articles">
    <app-category-post
      class="form"
      :disabled="loading"
      :access="access"
      :error-message="errorMessage"
      :category="category"
      :done-message="doneMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="list"
      :theads="theads"
      :categories="categoryList"
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
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.store.dispatch('categories/clearMessage');
    },
    updateValue(event) {
      this.category = event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory', this.category).then(() => {
        this.category = '';
      });
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
