<template>
  <app-category-detail
    :category="category"
    :access="access"
  />
</template>

<script>
import { CategoryDetail } from '@Components/molecules';

export default {
  components: {
    appCategoryDetail: CategoryDetail,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      console.log('5( Detail.vue/computed )')
      return this.$store.state.categories.category;
    },
  },
  created() {
    console.log('1( Detail.vue/created )')
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', { id });
    this.$store.dispatch('categories/resetView');
  },
};
</script>
