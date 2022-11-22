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
  },
  methods: {
    editedCategory($event) {
      this.categoryName = $event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      const { id } = this.$route.params;
      this.$store.dispatch('categories/updateCategory', {
        id,
        name: this.categoryName,
      });
    },
    editUser() {
      this.$store.dispatch('users/editUser', {
        id: this.user.id,
        /* eslint-disable-next-line no-irregular-whitespace */
        full_name: this.user.fullName.replace(/(　)+/, ' ').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        account_name: this.user.accountName.replace(/( |　)+/, '').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        email: this.user.email.replace(/( |　)+/, '').trim(),
        role_id: this.roleList.find(role => role.value === this.user.role).id,
      });
    },
  },
};
</script>
