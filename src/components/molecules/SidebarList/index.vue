<template>
  <ul :class="className">
    <app-list-item
      v-for="item in targetArray"
      :key="item.id"
    >
      <app-router-link
        :to="itemPath(item)"
        exact-active-class="is-active"
        hover-opacity
        block
        large
        white
        round
      >
        {{ item.name }}
      </app-router-link>
    </app-list-item>
  </ul>
</template>

<script>
import { ListItem, RouterLink } from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
    appRouterLink: RouterLink,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    itemPath(item) {
      const { page } = this.$route.query;
      const { path } = item;
      if (path === '/articles') {
        return { path: '/articles', query: { page } };
      }
      return path;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
