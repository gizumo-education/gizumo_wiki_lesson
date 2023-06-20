<template>
  <div class="categories-list">
    <categoryPost
      class="post-width"
      :error-message="errorMessage"
      :access="access"
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
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$store.dispatch('categories/getAllCategories');
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
