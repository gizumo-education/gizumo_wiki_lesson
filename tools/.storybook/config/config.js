import { configure } from '@storybook/vue'

import Vue from 'vue';
import Vuex from 'vuex';
import { addParameters } from '@storybook/vue/dist/client/preview';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';

//plugins
import { ValidationProvider } from 'vee-validate';

//atoms
import AppButton from '@Components/atoms/Button/index.vue';
import Input from '@Components/atoms/Input/index.vue';
import  AppListItem from '@Components/atoms/ListItem/index.vue';
import Heading from '@Components/atoms/Heading/index.vue';
import AppRouterLink from '@Components/atoms/RouterLink/index.vue';
import AppText from '@Components/atoms/Text/index.vue';
import AppTextarea from '@Components/atoms/Textarea/index.vue';

//molecules
import AppSidebarList from '@Components/molecules/SidebarList/index.vue';
import AppArticleList from '@Components/molecules/ArticleList/index.vue';
import AppMarkdownView from '@Components/molecules/MarkdownView/index.vue';

//globals
import AppHeader from '@Components/globals/Header/index.vue';
import Sidebar from '@Components/globals/Sidebar/index.vue';

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });
Vue.use(Vuex);

//plugins
Vue.component('validation-provider', ValidationProvider);

//atoms
Vue.component('app-button', AppButton);
Vue.component('app-input', Input);
Vue.component('app-list-item', AppListItem);
Vue.component('app-heading', Heading);
Vue.component('app-router-link', AppRouterLink);
Vue.component('app-text', AppText);
Vue.component('app-textarea', AppTextarea);

//molecules
Vue.component('app-sidebar-list', AppSidebarList);
Vue.component('app-article-list', AppArticleList);
Vue.component('app-markdown-view', AppMarkdownView);

//globals
Vue.component('app-header', AppHeader);
Vue.component('app-sidebar', Sidebar);

addParameters({
  backgrounds: [
    {
      name: 'appBackground',
      value: '#efefef !important',
      default: true,
    },
    {
      name: 'dakerColor',
      value: '#2c4f54 !important',
    },
    {
      name: 'keyColor',
      value: '#0a9dd5 !important',
    },
    {
      name: 'white',
      value: '#fff !important',
    },
  ],
})

function loadStories() {
  require('../../../src/js/stories/index.stories.js');
}

configure(loadStories, module)