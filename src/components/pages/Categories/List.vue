<template>
  <div class="Categories-edit">
    <app-category-post class="app-category-post">
    </app-category-post>
    <app-category-list
    :categories="categoriesList"
    :theads="theads"
    class="app-category-list"
    >
    </app-category-list>
  </div>
</template>

<script>
import { CategoryList } from '@Components/molecules'
import { CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoriesList(){
      return this.$store.state.categories.categoriesList;
    }
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
}

</script>

<style lang="scss" scoped>
.Categories-edit {
  display: flex;
  justify-content: space-between;
}
.app-category-post {
  width: 27%;
}
.app-category-list {
  width: 70%;
}

</style>
