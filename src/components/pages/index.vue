<template>
  <div class="wrapper">
    <app-header :signed-in="signedIn" />
    <div :class="contentClasses">
      <app-sidebar v-if="signedIn" />
      <main :class="contentMainClasses">
        <div class="content-inner">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Header, Sidebar } from '@Components/globals';

export default {
  components: {
    appHeader: Header,
    appSidebar: Sidebar,
  },
  computed: {
    signedIn() {
      return this.$store.state.auth.signedIn;
    },
    contentClasses() {
      return [
        'content',
        this.$route.name,
      ];
    },
    contentMainClasses() {
      return [
        'content-main',
        this.$route.name,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  padding-top: $header-height;
  z-index: $z-content;
  &.articlePost,
  &.articleEdit {
    height: 100vh;
  }
  &-main {
    padding-left: $sidebar-width;
    width: 100%;
    &.signin,
    &.signout,
    &.notfound {
      padding-left: 0;
    }
  }
  &-inner {
    padding: 20px;
    height: 100%;
  }
}
</style>
