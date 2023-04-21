<template>
  <div class="flex">
    <app-category-post
      class="left"
      :access="access"
      :category="updateName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />

    <app-category-list
      class="right"
      :theads="theads"
      :categories="categoryList"
      :access="access"
      :delete-category-name="deleteCategoryName"
      @open-modal="openModal"
      @handle-click="handleClick"
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
  beforeRouteUpdate(to, from, next) {
    this.fetchCategories();
    next();
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoriesList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    updateName() {
      return this.$store.state.categories.updateName.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue(event) {
      const updateName = event.target.value;
      this.$store.dispatch('categories/updateCategory', updateName);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory');
    },
    openModal(categoryId, categoryName) {
      const deleteCategory = {
        categoryId,
        categoryName,
      };
      this.$store.dispatch('categories/confirmDeleteCategory', deleteCategory);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('categories/filteredCategories', category)
          .then(() => {
            if (this.$store.state.categories.categoriesList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('categories/getAllCategories');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
}
.right{
  width: 60%;
  margin-left: 2%;
}
.left{
  width: 40%;
  border-right: 1px solid $separator-color;
  padding-right: 2%;
}
</style>
