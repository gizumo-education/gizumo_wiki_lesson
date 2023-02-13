<template>
  <div class="categories">
    <app-category-post
      class="categories-input"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      :category="changeCategory"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <app-category-list
      class="categories-list"
      :access="access"
      :categories="categoryList"
      :theads="theads"
    />
  </div>
</template>
<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

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
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    changeCategory() {
      return this.$store.state.categories.targetCategory.name;
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
    updateValue(data) {
      this.$store.dispatch('categories/updateValue', data);
    },
  },
};
</script>
<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: row;

  &-input {
    width: 35%;
  }

  &-list {
    width: 65%;
    overflow:hidden;
    border-left: 2px solid #e3e3e3;
    margin-left: 20px;
    padding-left: 20px;
  }
}
</style>
