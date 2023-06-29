<template>
  <div>
    <category-detail
      :access="access"
      :loading="loading"
      :disabled="loading ? true: false"
      :category="category"
      :category-id="categoryId"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @clear-message="clearMessage"
      @handle-submit="handleSubmit"
      @edited-category="editedCategory"
    />
  </div>
</template>

<script>
import CategoryDetail from '@Components/molecules/CategoryDetail/index.vue';

export default {
  components: {
    categoryDetail: CategoryDetail,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    selectCategoryName() {
      const selectCategoryName = this.$store.state.categories.targetCategory.name
      return selectCategoryName
    },
    categoryId() {
      let  id =this.$route.params.id;
      return id;
    },
    
    category() {
      // let  category =this.$store.state.categories.targetCategory.name
      let category=''
      return category;
    },
    doneMessage() {
        return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    }
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail',parseInt(this.categoryId,10))
  },

  methods: {
    handleSubmit() {
      if(this.loading)return;
      this.$store.dispatch('categories/updateCategory',parseInt(this.categoryId,10));
    },

    editedCategory($event) {
      this.$store.dispatch('categories/editedContent',$event.target.value);
      console.log($event.target.value)
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage')
    }
  },
 
}

</script>

<style lang="scss" scoped>
</style>