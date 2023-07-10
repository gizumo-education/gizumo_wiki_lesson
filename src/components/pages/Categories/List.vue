<template>
  <div class="category">
    <div class="category-post">
      <app-category-post
        :access="access"
        :category="newCategoryName"
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
import axios from '@Helpers/axiosDefault';
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
      categories: [],
      deleteCategoryName: '',
      newCategoryName: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    updateNewCategoryName(event) {
      this.newCategoryName = event.target.value;
    },
    fetchCategories() {
      const token = this.$store.getters['auth/token'];

      axios(token)
        .get('/category')
        .then(response => {
          this.categories = response.data.categories;
          this.categories.reverse();
        });
    },
    createCategory() {
      const token = this.$store.getters['auth/token'];

      const data = {
        name: this.newCategoryName,
      };
      axios(token)
        .post('/category', data)
        .then(response => {
          const createdCategory = response.data.category;
          this.categories.unshift(createdCategory);
          this.newCategoryName = ''; // 入力フィールドをリセット
        });
    },
  },
};
</script>

<style scoped>
.category {
    display: flex;
    justify-content: space-between;
}
.category-post {
  width: 40%;
}
.category-separator {
  width: 1px;
  background-color: #ccc;
  margin: 0 16px;
}
</style>
