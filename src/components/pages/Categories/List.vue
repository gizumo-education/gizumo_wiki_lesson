<template>
  <div class="category-item">
    <app-category-post
      class="category-item-post"
      :category="categoryName"
      :access="access"
      :done-message="doneMessage"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <app-category-list
      class="category-item-list"
      :categories="categoryList"
      :theads="theads"
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
      category: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    categoryName() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .category-item {
    display: flex;
    &-post {
      width: 35%;
      margin-right: 20px;
    }
    &-list {
      width: 65%;
      border-left: 1px solid $separator-color;
      padding-left: 20px;
      overflow: hidden;
    }
  }
</style>
