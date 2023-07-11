
<template>
  <div     class="list-contents">
    <app-category-post
    :category="Category"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :disabled="disabled"
    :access="access"
    class="list-content list-post"
      />
    <app-category-list
    :categories="categoriesList"
    class="list-content list-list"
    :theads="theads"
    />
  </div>
</template>
<script>
import {CategoryList} from '@Components/molecules';
import {CategoryPost} from '@Components/molecules'
import Mixins from '@Helpers/mixins';
  
  export default {
    components: {
      appCategoryList: CategoryList,
      appCategoryPost: CategoryPost,
    },
    data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
    computed: {
      categoriesList() {
        // console.log(this.$store.state)
      return this.$store.state.categories.categoryList;
    },
    //以下post
    category(){
      return this.$store.state.categories.category;
    },
    errorMessage(){
      return this.$store.state.categories.errorMessage;
    },
    doneMessage(){
      return this.$store.state.categories.doneMessage;
    },
    disabled(){
      return this.$store.state.categories.disabled;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    },
    props: {
    //   targetArray: {
    //   type: Array,
    //   default: () => [],
    // },
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
        this.$store.dispatch('getAllCategories');
      }
    },
    }
  }
</script>

<style lang="scss" scoped>

.list-contents {
  display: flex;
  
}
.list-content {
  // display: inline-block;
}

.list-post {
  width:40%;
  border-right: 1px solid #ccc;
  padding-right: 20px;
}

// .list-post::after {
//   position: absolute;
//   top: 0;
//   left: 100%;
//   margin: 0 1rem;
//   content: "";
//   width: 1px;
//   height: 100%;
//   background-color: #ccc;
// }

.list-list {
  width: 60%;
  padding-left: 20px;
}
</style>