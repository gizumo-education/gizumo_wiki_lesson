<template>
  <app-category-edit
    :access="access"
    :category="category"
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
      category: '',
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
      category: this.category,
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
