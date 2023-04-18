<template>
  <div class="flex">
    <app-category-post
      class="left"
      :access="access"
      :category="updateName"
      :error-message="errorMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />

    <app-category-list
      class="right"
      :theads="theads"
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
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    updateName() {
      return this.$store.state.categories.updateName.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue(event) {
      console.log(event);// eslint-disable-line no-console
      const updateName = event.target.value;
      this.$store.dispatch('categories/updateCategory', updateName);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory').then(() => {
      });
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
