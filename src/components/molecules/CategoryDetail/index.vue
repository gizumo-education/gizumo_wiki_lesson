<template>
  <div>
    <app-heading :level="1">
      カテゴリー管理
    </app-heading>
    <app-router-link
      class="category-update__link"
      block
      underline
      key-color
      hover-opacity
      :to="'/categories'"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <form @submit.prevent="handleSubmit">
      <app-input
        class="category-update__input"
        v-validate="'required'"
        name="category"
        type="text"
        data-vv-as="カテゴリー名"
        :value="category"
        @update-value="$emit('edited-category',$event)"
        :error-message="errors.collect('category')"
        />
        <app-button
          class="category-update__button"
          button-type="submit"
          round
          :disabled = "!disabled"
        >
          {{ buttonText }}
        </app-button>
  </form>

    <div v-if="doneMessage"
      class="category-update__success">
        <app-text bg-success>
            {{ doneMessage }}
        </app-text>
    </div>
        <div v-if="errorMessage"
          class="category-update__notice"
         >
        <app-text bg-error>
          {{ errorMessage }}
        </app-text>
      </div>
</div>
</template>
<script>
import{
  Heading, Button, RouterLink,Input,Text
}from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
    appRouterLink: RouterLink,
    appInput: Input,
    appText: Text,
  },
  props: {
    access: {
      type:Object,
      default:()=>({})
    },
    selectCategoryName: {
      type: String,
      default: '',
    },
    categoryId: {
      type: String,
      default: 0,
    },
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage:{
      type: String,
      default: '',
    },
    loading:{
      type: Boolean,
      default: false,
    },
    category:{
      type: String,
      required: true,
    },
  },
  computed:{
    buttonText() {
      if(!this.access.edit)return'更新権限がありません';
      return this.loading ? '更新中...' :'更新';
    },
    disabled() {
      return this.access.edit && !this.loading;
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.category)
      if (!this.access.edit) return;
      this.$emit('clear-message')
      this.$validator.validate().then(valid => {
        if(valid) this.$emit('handle-submit');
      });
    }
  },
}
</script>
<style lang="scss" scoped>
.category-update{
  &__link{
    margin-top: 16px;
  }
  &__button{
    margin-top: 16px;
  }
  &__input{
    margin-top: 16px;
  }
  &__success{
    margin-top: 16px;
  }
  &__notice{
    margin-top: 16px;
  }
}
</style>