<template>
  <div class="categories-list-mask">
    <div class="categories-list-mask-common">
      <app-category-post
        :category="category"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :disabled="disabled"
        :access="access"
        @update-value="updateCategory"
        @clear-message="clearMessage"
        @handle-submit="handleSubmit"
      />
    </div>
    <div>
      <app-category-list
        :theads="theads"
        :categories="categoriesList"
        :delete-category-name="name"
        :access="access"
        :error-message="errorMessage"
      />
    </div>
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
      category: '',
      errorMessage: '',
      doneMessage: '',
      disabled: false,
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.category.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    updateCategory(value) {
      this.category = value;
    },
    clearMessage() {
      this.errorMessage = '';
      this.doneMessage = '';
    },
    handleSubmit() {
    },
    getAllCategories() {
      this.$store.dispatch('getAllCategories')
        .then(() => {
          this.categoryList = this.$store.state.categoryList;
        }).catch(() => {
          // console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-list-mask {
  display: flex;
  justify-content: space-between;
    &-common {
      width: 39%;
      padding-right: 14px;
      border-right: 1px solid #eaeaea;
    }
}
</style>
