<template>
  <ul :class="className">
    <app-list-item
      v-for="item in targetArray"
      :key="item.id"
    >
      <app-router-link
        :to="item.path"
        exact-active-class="is-active"
        hover-opacity
        block
        large
        white
        round
      >
        <span @click="clearEditedValue">{{ item.name }}</span>
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
    clearEditedValue() {
      this.$emit('clear-edited-value');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
