<template>
  <div class="pageNation">
    <ul class="pageNation__items">
      <li>
        <app-button
          theme-color
          :disabled="disabled"
        >
          <router-link
            white
            :to="`articles?page=1`"
            @click="$emit('current-page')"
          >
            1
          </router-link>
        </app-button>
      </li>
      <li>
        <app-text
          bold
        >
          ...
        </app-text>
      </li>
      <li v-for="pageNum in lastPage" :key="pageNum">
        <app-button
          theme-color
          @click="$emit('current-page')"
        >
          <router-link
            white
            :to="`/articles?page=${pageNum}`"
          >
            {{ pageNum }}
          </router-link>
        </app-button>
      </li>
      <li>
        <app-text
          bold
        >
          ...
        </app-text>
      </li>
      <li>
        <app-button
          theme-color
          :disabled="disabled"
        >
          <router-link
            white
            :to="`/articles?page=${lastPage}`"
            @click="$emit('current-page')"
          >
            {{ lastPage }}
          </router-link>
        </app-button>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  RouterLink,
  Text,
  Button,
} from '@Components/atoms';

export default {
  components: {
    RouterLink,
    appText: Text,
    appButton: Button,
  },
  props: {
    lastPage: {
      type: Number,
      default() {
        return null;
      },
    },
    page: {
      type: Number,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
    };
  },
  computed: {
    disabled() {
      return this.pageNum ? '!disabled' : 'disabled';
    },
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
  .pageNation {
    &__items {
      display: flex;
    }
  }
</style>
