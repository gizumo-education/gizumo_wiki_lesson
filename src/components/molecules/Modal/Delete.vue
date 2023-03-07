<template>
  <app-modal>
    <div class="delete-modal">
      <app-text>本当に削除しますか？</app-text>

      <div class="delete-modal__content">
        <div class="delete-modal__button">
          <app-button
            disabled
            block
            pointer
            @click="closeModal"
          >
            戻る
          </app-button>
        </div>

        <div class="delete-modal__button">
          <app-button
            bg-danger
            block
            :disabled="!access.delete"
            @click="deleteUser"
          >
            削除する
          </app-button>
        </div>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { Modal, Text, Button } from '@Components/atoms';

export default {
  components: {
    appModal: Modal,
    appText: Text,
    appButton: Button,
  },
  props: {
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    deleteUser() {
      if (!this.access.delete) return;
      this.$emit('delete-user');
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-modal {
  &__content {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  &__button {
    width: 47%;
  }
}
</style>
