<template>
  <div class="category">
    <div class="category-post">
      <app-category-post
        :access="access"
        :category="newCategoryName"
        :disabled="creatingCategory"
        @update-value="updateNewCategoryName"
        @handle-submit="createCategory"
      />
    </div>
    <div class="category-separator" />
    <div class="category-list">
      <app-category-list
        :theads="theads"
        :categories="categories"
        :access="access"
      />
    </div>
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
      newCategoryName: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories; // Vuexのストアからカテゴリ一覧を取得
    },
    creatingCategory() {
      return this.$store.state.categories.creatingCategory;
    },
  },
  created() {
    this.$store.dispatch('categories/fetchCategories');
  },
  methods: {
    updateNewCategoryName(event) {
      this.newCategoryName = event.target.value;
    },
    createCategory() {
      this.$store.commit('categories/setCreatingCategory', true);
      this.$store.dispatch('categories/createCategory', this.newCategoryName)
        .finally(() => {
          this.$store.commit('categories/setCreatingCategory', false);
          this.newCategoryName = '';
        });
    },
  },
};
</script>

<style scoped>
.category {
  display: flex;
}
.category-post {
  width: 40%;
}
.category-list {
  width: 100%;
}
.category-separator {
  width: 1px;
  background-color: #ccc;
  margin: 0 16px;
}
</style>
