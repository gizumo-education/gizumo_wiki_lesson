<template>
  <app-category-post />
</template>
<script>

export default {
  created() {
    this.$store.dispatch('initPostCategory');
  },
};
</script>
