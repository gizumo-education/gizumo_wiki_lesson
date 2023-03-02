<template>
  <app-category-edit
    :error-message="errorMessage"
    :done-message="doneMessage"
    :edit-target-category-name="editTargetCategory.name"
    :loading="loading ? true : false"
    :access="access"
    @clear-message="clearMessage"
    @edited-category="editedCategory"
    @edit-category="editCategory"
    @update-value="editedCategory"
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
      editTargetCategory: {
        id: '',
        name: '',
      },
    };
  },
  computed: {
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const { id } = this.$route.params;
    console.log(id);
    this.$store.dispatch('categories/getCategory', { id });
    this.editTargetCategory={id, name: this.$store.state.categories.category.name};
    console.log(this.editTargetCategory);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    editedCategory($event) {
      console.log($event.target.value);
      this.editTargetCategory.name=$event.target.value;
      // this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    // updateValue(target) {
    //   console.log(target.target.value);
    //   if (!this.loading) this.$store.dispatch('categories/updateValue', $event.target.value);
    // },
    editCategory() {
      console.log(this.editTargetCategory.name);
      this.$store.dispatch('categories/editCategory', {
        id: this.editTargetCategory.id,
        /* eslint-disable-next-line no-irregular-whitespace */
        name: this.editTargetCategory.name.replace(/(　)+/, ' ').trim(),
      });
    },
  },
};
</script>
