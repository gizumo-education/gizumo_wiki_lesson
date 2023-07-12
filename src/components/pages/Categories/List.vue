<template>
  <div class="category">
    <div class="category-post">
      <app-category-post
        :access="access"
        :category="newCategoryName"
        :disabled="creatingCategory"
        :buttontext="buttonText"
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
      creatingCategory: false,
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories; // Vuexのストアからカテゴリ一覧を取得
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
      const token = this.$store.getters['auth/token'];

      const data = {
        name: this.newCategoryName,
      };
      this.creatingCategory = true;
      this.$store.dispatch('categories/createCategory', { token, data })
        .then(() => {
          this.newCategoryName = '';
          this.creatingCategory = false;
        })
        .catch(() => {
          this.creatingCategory = false;
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
