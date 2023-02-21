<template>
  <div class="categories">
    <app-category-post
      class="categories-input"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="loadingStatus"
      :access="access"
      :category="targetCategory.name"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />

    <app-category-list
      class="categories-list"
      :access="access"
      :categories="categoryList"
      :category-title="targetCategory.name"
      :theads="theads"
      :delete-category-name="deleteCategory.name"
      :error-message="listErrorMessage"
      :done-message="listDoneMessage"
      @handle-click="handleClick"
      @open-modal="openModal"
    />
  </div>
</template>
<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
      targetCategory: {
        name: '',
      },
      deleteCategory: {
        id: '',
        name: '',
      },
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    listErrorMessage() {
      return this.$store.state.categories.listErrorMessage;
    },
    listDoneMessage() {
      return this.$store.state.categories.listDoneMessage;
    },
    loadingStatus() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      if (this.$store.state.categories.loading) return;
      const categoryName = this.targetCategory.name;
      this.$store.dispatch('categories/postCategory', categoryName)
        .then(() => {
          this.targetCategory.name = '';
        });
    },
    updateValue(event) {
      this.targetCategory.name = event.target.value;
    },
    handleClick() {
      const categoryId = this.deleteCategory.id;
      this.$store.dispatch('categories/deleteCategory', categoryId)
        .then(() => {
          this.toggleModal();
        })
        .catch(() => {
          this.toggleModal();
        });
    },
    openModal(id, name) {
      this.toggleModal();
      this.deleteCategory.id = id;
      this.deleteCategory.name = name;
    },
  },
};
</script>
<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: row;

  &-input {
    width: 35%;
  }

  &-list {
    width: 65%;
    overflow:hidden;
    border-left: 2px solid #e3e3e3;
    margin-left: 20px;
    padding-left: 20px;
  }
}
</style>
