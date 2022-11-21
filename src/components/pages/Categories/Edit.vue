<template>
  <app-category-edit
    :access="access"
    :category-name="categoryName"
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
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', {
      id,
    }).then(() => {
      this.categoryName = this.$store.state.categories.category.name;
    });
  },
  methods: {
    editedCategory($event) {

    },
    handleSubmit() {

    },
  },
};
</script>
