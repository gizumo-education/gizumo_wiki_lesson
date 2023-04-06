<template>
  <app-category-edit
    :category="targetCategory"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :access="access"
    @edited-name="editedName"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    targetCategory() {
      return this.$store.state.categories.targetCategory;
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
  },
  created() {
    this.$store.dispatch('categories/getTargetCategory', this.$route.params.id);
  },
  methods: {
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
  },
};
</script>
