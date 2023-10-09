<template>
  <div class="articles">
    <app-category-post
      class="form"
      :loading="loading"
      :access="access"
    />
    <app-category-list
      class="list"
      :theads="theads"
      :categories="categoryList"
      :done-message="doneMessage"
      :loading="loading"
      :access="access"
      :markdown-content="markdownContent"
      @open-modal="openModal"
    />
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
      categories: [
        {
          id: null,
          title: '',
        },
      ],
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    markdownContent() {
      return `# ${this.categoryTitle}\n${this.categoryContent}`;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .articles {
    display: flex;
    writing-mode: lr-tb;
  }
  .form {
    flex-basis: 40%;
    border-right: 1px solid #ccc;
    padding-right: 2%;
  }
  .list {
    flex-basis: 60%;
    padding-left: 2%;
  }
  .td {
    padding: 40%;
  }
</style>
