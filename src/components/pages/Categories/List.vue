<template>
  <section class="categories">
    <div class="categories__post__form">
      <app-category-post
        :access="access"
        :category="category"
        :disabled="loading ? true : false"
        @update-value="updateValue"
        @add-category="addCategory"
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
    updateValue(target) {
      this[target.name] = target.value;
    },
    addCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/addCategory', {
        category: this.category.replace(/( | )+/, '').trim(),
      }).then(() => {
        this.$router.push('/categories');
      });
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
