<template>
  <div class="categories">
    <app-category-post
      class="categories-input"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="loadingStatus"
      :access="access"
      :category="categoryName"
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
      targetCategory: {
        name: '',
      },
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
    categoryName() {
      return this.$data.targetCategory.name;
    },
    loadingStatus() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      if (this.$store.state.categories.loading) return;
      const categoryName = this.targetCategory.name;
      this.$store.dispatch('categories/postCategory', categoryName)
        .then(() => {
          this.targetCategory.name = '';
        });
    },
    updateValue(event) {
      this.targetCategory.name = event.target.value;
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
