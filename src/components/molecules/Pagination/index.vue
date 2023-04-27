<template>
  <ol class="pagination">
    <li class="pagination-btn">1</li>
    <li class="pagination-btn pagination-dots">• • •</li>
    <li class="pagination-btn">now</li>
    <li class="pagination-btn pagination-dots">• • •</li>
    <li class="pagination-btn">last</li>
  </ol>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  text-align: center;
  margin-top: 30px;
  &-btn {
    width: 56px;
    padding: 10px;
    margin-left: 20px;
    color: $white;
    font-size: 16px;
    line-height: 24px;
    background-color: $theme-color;
    &:first-child {
      margin-left: 0;
    }
  }
  &-dots {
    color: $disabled-color;
    background-color: $white;
  }
}
</style>
