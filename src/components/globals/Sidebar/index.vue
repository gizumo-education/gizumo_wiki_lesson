<template>
  <aside class="sidebar">
    <app-sidebar-list
      class-name="sidebar-list"
      :target-array="routeLinksArray"
    />
  </aside>
</template>

<script>
import routeLinksArray from '@Helpers/routeLinksArray';
import { SidebarList } from '@Components/molecules';

export default {
  components: {
    appSidebarList: SidebarList,
  },
  computed: {
    routeLinksArray() {
      return routeLinksArray;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: $header-height;
  left: 0;
  padding: 10px;
  width: $sidebar-width;
  height: 100%;
  color: #fff;
  text-align: center;
  background-color: $sub-theme-color;
  z-index: $z-sidebar;
}
</style>
