<template>
  <app-category-edit
    :access="access"
    :category-name="categoryName"
    :disabled="loading"
    @edited-category="editedCategory"
    @handle-submit="handleSubmit"
  />
</template>
<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
      categoryName: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', {
      id,
    }).then(() => {
      this.categoryName = this.$store.state.categories.category.name;
    });
    console.log(this.$route.params);
  },
  methods: {
    editedCategory($event) {
      this.categoryName = $event.target.value;
      console.log(this.categoryName);
    },
    handleSubmit() {
      console.log('submit');
    },
  },
};
</script>
