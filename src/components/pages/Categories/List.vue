<template>
  <div class="categories-list">
    <categoryPost class="post-width" />
    <categoryList
      :categories="categories"
      :theads="theads"
      class="list-width"
    />
  </div>
</template>

<script>
import categoryList from '@Components/molecules/CategoryList/index.vue';
import categoryPost from '@Components/molecules/CategoryPost/index.vue';

export default {
  components: {
    categoryList,
    categoryPost,
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
.post-width{
  width: 40%;
}
</style>
