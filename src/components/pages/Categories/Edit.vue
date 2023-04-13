<template>
  <div>
    <app-category-edit
      :current-category-name="currentCategoryName"
      :access="access"
      :disabled="disabled"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @updated-category="updatedCategory"
      @handle-submit="handleSubmit"
    />
  </div>
</template>

<script>
import CategoryEdit from '@Components/molecules/CategoryEdit/index.vue';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryId() {
      const id = parseInt(this.$route.params, 10);
      return id;
    },
    currentCategoryName() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
    },
    newCategoryName() {
      const { name } = this.$store.state.categories.newCategory;
      return name;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategory', this.categoryId);
  },
  methods: {
    handleSubmit() {
      if (this.currentCategoryName === this.newCategoryName) {
        this.$store.dispatch('categories/showMessage');
      } else {
        this.$store.dispatch('categories/editCategory');
      }
    },
    updatedCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('categories/updatedCategory', categoryName);
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  height: 100%;

  &_post {
    width: 38%;
  }
  &_list {
    width: 62%;
    margin-left: 18px;
    padding-left: 18px;
    border-left: 2px solid $separator-color;
    overflow: hidden;
  }
  .errorMessage {
    width: 62%;
    margin-left: 18px;
    border-left: 2px solid $separator-color;
    p {
      width: 20%;
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
    }

  }
}
</style>
