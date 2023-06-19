<template>
  <div class="categories-list">
    <CategoryPost :class="{listWidth}" />
    <CategoryList :categories="categories" :class="{listWidth}" />
  </div>
</template>
<script>
import CategoryList from '@Components/molecules/CategoryList/index.vue';
import CategoryPost from '@Components/molecules/CategoryPost/index.vue';

export default {
  components: {
    CategoryList,
    CategoryPost,
  },
  data() {
    return {
      listWidth: true,
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
.listWidth{
  width: 50%;
}
</style>
