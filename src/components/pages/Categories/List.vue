<template>
  <div class="categories">
    <div class="categories__post">
      <app-category-post
        :category="categoryName"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :delete-category-name="deleteCategoryName"
        :disabled="disabled"
        :access="access"
        @update-value="updatedCategory"
        @handle-submit="addCategory"
      />
    </div>
    <div class="categories__content">
      <app-category-list
        :theads="theads"
        :categories="categories"
        :access="access"
        @open-modal="openDeleteModal"
      />
    </div>
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    AppCategoryList: CategoryList,
    AppCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    categoryName() {
      const name = this.$store.state.categories.targetCategory;
      return name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    deleteCategoryName() {
      console.log(this.$store.state.categories.deleteCategory.name);
      return this.$store.state.categories.deleteCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/initTargetCategory');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    addCategory() {
      if (this.disabled) return;
      this.$store.dispatch('categories/addCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    updatedCategory($event) {
      this.$store.dispatch('categories/updatedCategory', $event.target.value);
    },
    openDeleteModal(id, name) {
      this.toggleModal();
      this.$store.dispatch('categories/openDeleteModal', { id, name });
    },
  },
};
</script>

<style lang='scss' scoped>
  .categories {
    height: calc(100vh - 54px);;
    display: flex;

    &__post {
      height: calc(100vh - 54px);;
      width: 30%;
      margin-right: 25px;
    }

    &__content {
      height: calc(100vh - 54px);
      width: 70%;
      padding-left: 25px;
      border-left: 1px solid #cdcdcd;
    }
  }
</style>
