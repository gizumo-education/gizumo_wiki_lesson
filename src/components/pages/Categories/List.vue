<template>
  <div class="categories">
    <app-category-Post
      class="categories__post"
      :category="categoryName"
      :error-message="errorMessage"
      :loading="loading"
      :done-message="doneMessage"
      :access="access"
      @edited-category="editedCategory"
      @handle-submit="handleSubmit"
    />
    <app-category-List
      class="categories__list"
      :categories="categoryList"
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
      category: '',
    };
  },
  computed: {
    categoryName() {
      const { name } = this.$store.state.categories.category;
      return name;
    },
    categoryList() {
      return this.$store.getters['categories/transformedCategories'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
    doneMessage() {
      return this.$store.state.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    editedCategory($event) {
      this.$store.dispatch('categories/editedTitle', $event.category.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
<style lang="scss" scoped>
.categories {
  display: flex;
  justify-content: space-between;
  &__post {
    padding-right: 30px;
    width: 45%;
  }
  &__list {
    padding-left: 30px;
    border-left: 1px solid $separator-color;
    width: 100%;
  }
  &__list::-webkit-scrollbar{
  display:none;
}
}
</style>
