<template>
    <app-category-post
    :category="Category"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :disabled="disabled"
    :access="access"
    />
</template>
<script>
import {CategoryPost} from '@Components/molecules';
  
  export default{
    components: {
    // appCategoryPost: CategoryPost,
  },
  created(){
    this.$store.dispatch('initPostCategory');
  },
  computed: {
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
  };
</script>