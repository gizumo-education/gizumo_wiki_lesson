<template>
  <app-category-edit
    :category-id="categoryId"
    :category-name="categoryName"
    :loading="loading"
    :done-message="doneMessage"
    :access="access"
    @update-value="editValue"
    @handle-submit="handleSubmit"
  />
</template>

<script>
import CategoryEdit from '@Components/molecules/CategoryEdit/index.vue';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    categoryName() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
      // return this.$store.state.categories.editCategory.name;
    },
    // editCategoryName() {
    //   return this.$store.state.categories.editCategory.name;
    // },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/getCategoryDetail', parseInt(this.categoryId, 10));
  },
  methods: {
    editValue($event) {
      const editCategory = $event.target.value;
      this.$store.dispatch('categories/editValue', editCategory);
    },
    handleSubmit() {
      if (this.categoryName === this.editCategoryName) {
        this.$store.state.dispatch('categories/showMessage');
      } else {
        this.$store.dispatch('categories/updateCategory');
      }
    },
  },
};
</script>
