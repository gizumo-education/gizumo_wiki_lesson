<template>
  <div class="pagination">
    <app-button
      :disabled="queryPage === firstPage"
      @click="clickPagination($event)"
    >
      {{ firstPage }}
    </app-button>
    <app-text
      class="pagination--omit"
      bold
    >
      …
    </app-text>
    <app-button
      :disabled="queryPage === secondPage"
      @click="clickPagination($event)"
    >
      {{ secondPage }}
    </app-button>
    <app-button
      :disabled="queryPage === thirdPage"
      @click="clickPagination($event)"
    >
      {{ thirdPage }}
    </app-button>
    <app-button
      :disabled="queryPage === fourthPage"
      @click="clickPagination($event)"
    >
      {{ fourthPage }}
    </app-button>
    <app-button
      :disabled="queryPage === fifthPage"
      @click="clickPagination($event)"
    >
      {{ fifthPage }}
    </app-button>
    <app-button
      :disabled="queryPage === sixthPage"
      @click="clickPagination($event)"
    >
      {{ sixthPage }}
    </app-button>
    <app-text
      class="pagination--omit"
      bold
    >
      …
    </app-text>
    <app-button
      :disabled="queryPage === lastPage"
      @click="clickPagination($event)"
    >
      {{ lastPage }}
    </app-button>
  </div>
</template>
<script>
import { Button, Text } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appText: Text,
  },
  props: {
    firstPage: {
      type: Number,
      required: true,
    },
    secondPage: {
      type: Number,
      required: true,
    },
    thirdPage: {
      type: Number,
      required: true,
    },
    fourthPage: {
      type: Number,
      required: true,
    },
    fifthPage: {
      type: Number,
      required: true,
    },
    sixthPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
    queryPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    clickPagination($event) {
      this.$emit('move-article-page', $event);
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 36px;
  text-align: center;

  &--omit {
    color: #aeaeae;
    font-size: 20px;
    padding-top: 4px;
  }
}
</style>
