<template>
  <div class="categories-list">
    <categoryPost
      class="post-width"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      :category="category"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <categoryList
      :categories="categories"
      :theads="theads"
      class="list-width list-border"
      :access="access"
    />
  </div>
</template>

<script>
import CategoryList from '@Components/molecules/CategoryList/index.vue';
import CategoryPost from '@Components/molecules/CategoryPost/index.vue';

export default {
  components: {
    categoryList: CategoryList,
    categoryPost: CategoryPost,
  },
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
      return this.$store.state.categories.targetCategories.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.getCategories();
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
