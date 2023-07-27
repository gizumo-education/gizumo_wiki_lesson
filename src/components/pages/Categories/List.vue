<template>
  <div class="categories-list-mask">
    <div class="categories-list-mask-input">
      <app-category-post
        :done-message="doneMessage"
        :category="newCategoryName"
        :access="access"
        :disabled="loading"
        :error-message="errorMessage"
        @update-value="updateNewCategoryName"
        @handle-submit="createCategory"
        @clear-message="clearMessage"
      />
    </div>
    <div class="categories-list-mask--confirm">
      <app-category-list
        :theads="theads"
        :categories="categoriesList"
        :access="access"
      />
    </div>
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
      newCategoryName: '',
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.category.categoryList;
    },
    doneMessage() {
      return this.$store.state.category.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.category.loading;
    },
    errorMessage() {
      return this.$store.state.category.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('category/getAllCategories');
    this.$store.dispatch('category/clearMessage');
  },
  methods: {
    createCategory() {
      this.$store.dispatch('category/loading', true);
      this.$store.dispatch('category/createCategory', this.newCategoryName)
        .then(response => {
          if (response.doneMessage === '成功') {
            this.newCategoryName = '';
          }
        });
    },
    updateNewCategoryName(event) {
      this.newCategoryName = event.target.value;
    },
    getAllCategories() {
      this.$store.dispatch('category/getAllCategories');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-list-mask {
  display: flex;
  justify-content: space-between;
  &-input {
    width: 30%;
    padding-right: 20px;
    border-right: 1px solid #eaeaea;
  }
  &--confirm {
    width: 70%;
    padding-left: 20px;
  }
}
</style>
