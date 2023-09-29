<template>
  <div>
    <app-Category-Post />
    <app-Category-List
      :theads="theads"
      :categories="categoryList"
      :done-message="doneMessage"
      :access="access"
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
        // {
        //   id: 1,
        //   title: 'aaa',
        // },
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
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    openModal(categoriesId) {
      this.$store.dispatch('categories/confirmDeleteCategories', categoriesId);
      this.toggleModal();
    },
  },
};

</script>
