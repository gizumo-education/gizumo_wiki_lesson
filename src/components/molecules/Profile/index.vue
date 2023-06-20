<template>
  <section class="profile">
    <app-heading :level="1">ログインアカウントの詳細</app-heading>

    <div class="profile__info">
      <div class="profile__info__row">
        <div class="profile__info__row__title">
          <app-text theme-color bold>名前</app-text>
        </div>
        <div class="profile__info__row__content">
          <app-text>{{ user.full_name }}</app-text>
        </div>
      </div>
      <div class="profile__info__row">
        <div class="profile__info__row__title">
          <app-text theme-color bold>アカウント名</app-text>
        </div>
        <div class="profile__info__row__content">
          <app-text>{{ user.account_name }}</app-text>
        </div>
      </div>
      <div class="profile__info__row">
        <div class="profile__info__row__title">
          <app-text theme-color bold>メールアドレス</app-text>
        </div>
        <div class="profile__info__row__content">
          <app-text>{{ user.email }}</app-text>
        </div>
      </div>

      <div class="profile__info__row">
        <div class="profile__info__row__title">
          <app-text theme-color bold>権限</app-text>
        </div>
        <div class="profile__info__row__content">
          <app-text>{{ user.role.name }}</app-text>
        </div>
      </div>
    </div>

    <div class="profile__button">
      <app-router-link
        to="/password/update"
        bg-danger
        white
        large
        round
      >
        パスワードの変更をする
      </app-router-link>
    </div>
  </section>
</template>

<script>
import { Heading, Text, RouterLink } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &__info {
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    &__row {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid $separator-color;
      &:first-child {
        margin-top: 0;
      }
      &__title {
        width: 20%;
        /* text-align: right; */
      }
      &__content {
        margin-left: 10%;
        width: 70%;
      }
    }
  }
  &__button {
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
  }
}
</style>
