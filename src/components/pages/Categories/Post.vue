<template>
  <app-category-post />
</template>

<script>
import { CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      title: '',
    };
  },
};
</script>
