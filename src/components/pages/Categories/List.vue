<template>
  <div class="list-contents">
    <app-category-post
      :access="access"
      :category="categoryName"
      :disabled="loading"
      :done-message="doneMessage"
      class="list-content list-post"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      :categories="categoriesList"
      class="list-content list-list"
      :theads="theads"
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
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    categoryName() {
      return this.$store.state.categories.targetCategory.category.name;
    },
  },
  created() {
    this.fetchCategories();
    this.resetView();
  },
  methods: {
    resetView() {
      this.$store.dispatch('categories/resetView');
    },
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    updateValue($event) {
      const categoryName = $event.target.value;
      this.$data.category = categoryName;
      this.$store.dispatch('categories/updateValue', categoryName);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory');
    },
  },
};
</script>

<style lang="scss" scoped>

.list-contents {
  display: flex;
}

.list-post {
  width:40%;
  border-right: 1px solid #ccc;
  padding-right: 20px;
}

.list-list {
  width: 60%;
  padding-left: 20px;
}
</style>
