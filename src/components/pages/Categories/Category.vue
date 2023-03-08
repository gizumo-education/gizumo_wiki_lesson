<template>
  <div class="category">
    <app-category-post
      class="category-form"
      :access="access"
      :category="categoryName"
      :done-message="completeMessage"
      :error-message="incompleteMessage"
      :disabled="loading"
      @handle-submit="addCategory"
      @update-value="categoryName = $event.target.value"
    />
    <!-- @エミットを受け取る＝行いたい処理 -->
    <app-category-list
      class="category-list"
      :access="access"
      :categories="categories"
      :delete-category-name="deleteCategoryName"
      @open-modal="openModal"
      @handle-click="handleClick"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      categoryName: '',
      deleteCategoryName: '',
      categoryId: null,
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoriesList;
    },
    completeMessage() {
      return this.$store.state.categories.doneMessage;
    },
    incompleteMessage() {
      return this.$store.state.categories.errorMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllLists');
  },
  methods: {
    addCategory() {
      this.$store.dispatch('categories/postCategory', this.categoryName);
      this.categoryName = '';
    },
    openModal(id, name) {
      this.toggleModal();
      this.deleteCategoryName = name;
      this.categoryId = id;
    },
    handleClick() {
      this.toggleModal();
      this.$store.dispatch('categories/deleteCategory', this.categoryId);
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display:flex;
}
.category-form {
  flex-basis:30%;
}
.category-list {
  flex-basis:70%;
}
</style>
