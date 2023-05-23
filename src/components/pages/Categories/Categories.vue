<template>
  <div class="category">
    <app-category-Post
      :category="targetCategory"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      class="category-form"
      @handle-submit="addCategory"
      @update-value="updatedCategory"
    />
    <app-category-list
      :theads="theads"
      :categories="categories"
      :access="access"
      class="category-list"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    targetCategory() {
      return this.$store.state.categories.targetCategory;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    addCategory() {
      if (this.disabled) return;
      this.$store.dispatch('categories/addCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    updatedCategory($event) {
      this.$store.dispatch('categories/updatedCategory', $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  width: 100%;
}

.category-form{
  width: 35%;
  padding-right: 20px;
}
.category-list {
  padding-left: 20px;
  width: 65%;
  border-left: 2px solid #eaeaea;
}
</style>
