
<template>
    <app-category-list
    :target-array="categoryList"
    />
</template>
<script>
import {CategoryList} from '@Components/molecules';
import Mixins from '@Helpers/mixins';
  
  export default {
    data() {
      return {
      
      categoryList: [{
          // id: 1,
          // name:'yay'
        }],
        thead: [{
          // id: 1,
          // name:'yay'
        }],
      };
    },
    components: {
      appCategoryList: CategoryList,
    },
    state: {
      // targetCategory: {
      //   category: {
      //     id: null,
      //     name: '',
      //   },
      // },
      // categoryList: [],
    },
    computed: {
      categoryList() {
      return this.$store.state.categories.categoryList;
    },
    },
    props: {
      targetArray: {
      type: Array,
      default: () => [],
    },
    },
    mutations: {
    // doneGetAllCategories(state, payload) {
    //   state.categoryList = [...payload.category];
    //   },
    },
    created() {
    this.fetchCategories();
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchCategories();
    next();
  },
    methods: {
      fetchCategories() {
      if (this.$route.query.categories) {
        console.log('true')
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('categories/filteredCategories', category)
          .then(() => {
            if (this.$store.state.categories.categoryList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        console.log('false cate');
        console.log(this.$store);
        this.$store.dispatch('categories/getAllCategories');
      }
    },
    }
  }
</script>