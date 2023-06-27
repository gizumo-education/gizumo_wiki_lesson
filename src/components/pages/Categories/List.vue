<template>
  <div class="categories-list">
    <category-post
      class="post-width"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      :category="category"
      :loading="loading"
      :disabled="loading ? true: false"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <category-list
      :categories="categories"
      :theads="theads"
      class="list-width list-border"
      :access="access"
      :category="category"
      :delete-category-name="deleteCategoryName"
      @handle-click="handleClick"
      @open-modal="openModal"
      @toggle-modal="toggleModal"
    />
  </div>
</template>

<script>
import CategoryList from '@Components/molecules/CategoryList/index.vue';
import CategoryPost from '@Components/molecules/CategoryPost/index.vue';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    categoryList: CategoryList,
    categoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    category() {
      return this.$store.state.categories.targetCategory.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.getCategories();
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    getCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategories');
    },
    updateValue(event) {
      this.$store.dispatch('categories/updateCategories', event.target.value);
    },
    openModal(categoryId, categoryName) {
      const payload = {
        categoryId,
        categoryName,
      };
      this.$store.dispatch('categories/confirmDeleteCategory', payload);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.toggleModal();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-list{
  display:flex;
}
.list-width{
  width: 60%;
}
.list-border{
  border-left: 1px solid #ccc ;
  padding: 0 20px;
}
.post-width{
  width: 40%;
}
</style>
