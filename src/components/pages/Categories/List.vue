<template>
  <div class="categories">
    <app-category-post
      :category="category"
      :access="access"
      :disabled="loading"
      :done-message="doneMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      :categories="categoryList"
      :access="access"
      :done-message="doneMessage"
      :theads="theads"
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
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    deleteCategoryName() {
      return this.$store.getters['categories/deleteCategoryName'];
    },
    category() {
      return this.$store.state.categories.targetCategory.name;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    openModal(categoryId, categoryName) {
      this.$store.dispatch(
        'categories/confirmDeleteCategory',
        { categoryId, categoryName },
      );
      this.toggleModal();
    },
    updateValue($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategories').then(() => {
        this.$store.dispatch('categories/getCategories');
      });
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getCategories');
      });
      this.toggleModal();
    },
  },

};
</script>
<style lang="scss" scoped>
.categories {
  display: flex
};

.categories form {
  width: 350px;
  flex-shrink: 0;
  position: relative;
  padding-right:20px ;
};

.categories form::after {
  position: absolute;
  top: 0;
  left: 100%;
  content: "";
  width: 1px;
  height: 100%;
  background-color: rgb(181, 181, 181);;
};
</style>
