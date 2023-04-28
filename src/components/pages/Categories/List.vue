<template>
  <div class="category">
    <app-category-post
      class="category-post"
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      :disabled="loading ? true : false"
      :button-text="buttonText"
      @handle-submit="addCategory"
      @clear-message="clearMessage"
      @update-value="updateValue"
    />
    <app-category-list
      :categories="categoryList"
      :theads="theads"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
    };
  },
  computed: {
    loading() {
      return this.$store.state.categories.loading;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    buttonText() {
      return this.disabled ? '作成中...' : '作成';
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(target) {
      this.category = target.value;
    },
    addCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/addCategory', {
        category: this.category,
      });
      this.category = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &-post{
    height: 100%;
    width: 30%;
    padding-right: 20px;
  }
  &-list{
    height: 100%;
    width: 70%;
    border-left: 1px solid $separator-color;
    padding-left: 20px;
  }
  &__table{
    margin-top: 20px;
  }
}
</style>
