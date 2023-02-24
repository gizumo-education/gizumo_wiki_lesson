<template>
  <div class="category__edit">
    <app-category-edit
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      :category="targetCategory.name"
      @update-value="updateValue"
      @handle-submit="editCategory"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },

  data() {
    return {
      updatedCategory: {
        id: '',
        name: '',
      },
    };
  },

  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    targetCategory() {
      return this.$store.state.categories.editTargetCategory;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
  },

  created() {
    this.$store.dispatch('categories/setTargetCategory', this.$route.params.id);
    this.$store.dispatch('categories/clearMessage');
  },

  methods: {
    updateValue(event) {
      this.updatedCategory = {
        id: this.targetCategory.id,
        name: event.target.value,
      };
    },

    editCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/editCategory', this.updatedCategory).then(() => {
        this.$router.push('/categories');
        this.updatedCategory = '';
      });
    },
  },
};

</script>
