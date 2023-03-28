<template>
  <section class="categories">
    <div class="categories__post__form">
      <app-category-post
        :error-message="errorMessage"
        :access="access"
        :category="category"
        :disabled="loading ? true : false"
        @clear-message="clearMessage"
        @handle-submit="addCategory"
        @update-value="updateValue"
      />
    </div>
    <div class="categories__list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :error-message="errorMessage"
        :access="access"
      />
    </div>
  </section>
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategoryList');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(event) {
      this.category = event.target.value;
    },
    addCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/addCategory', this.category);
      this.category = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
    &__post__form {
        width: 40%;
    }
    &__list {
      padding: 10px 20px;
      margin-left: 20px;
      border-left: 1px solid $separator-color;
    }
}
</style>
