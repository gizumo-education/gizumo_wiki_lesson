<template>
  <div class="categories">
    <app-category-post
      class="categories_post"
      :category="categoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      :disabled="disabled"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <div v-if="errorMessage" class="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
    <app-category-list
      v-else
      class="categories_list"
      :theads="theads"
      :categories="categoriesList"
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
    };
  },
  computed: {
    categoryName() {
      return this.$store.state.categories.targetCategory.name;
    },
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue(event) {
      const targetCategory = event.target.value;
      this.$store.dispatch('categories/updateValue', targetCategory);
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  height: 100%;

  &_post {
    width: 38%;
  }
  &_list {
    width: 62%;
    margin-left: 18px;
    padding-left: 18px;
    border-left: 2px solid $separator-color;
    overflow: hidden;
  }
  .errorMessage {
    width: 62%;
    margin-left: 18px;
    border-left: 2px solid $separator-color;
    p {
      width: 20%;
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
    }

  }
}
</style>
