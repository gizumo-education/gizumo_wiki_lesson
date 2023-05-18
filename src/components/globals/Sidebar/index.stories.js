import { storiesOf } from '@storybook/vue';
import storyRouter from 'storybook-vue-router';

import note from './README.md';

const routeLinksArray = [
  {
    id: 1,
    name: 'HOME',
    path: '/',
  },
  {
    id: 2,
    name: '記事',
    path: '/all/articles',
  },
  {
    id: 3,
    name: 'カテゴリー',
    path: '/category',
  },
  {
    id: 4,
    name: 'ユーザー',
    path: '/users',
  },
]

storiesOf('GLOBALS|Sidebar', module)
  .addDecorator(storyRouter())
  .add('default', () => {
    return {
      template: `<app-sidebar 
                  :target-array="routeLinksArray"
                />`,
      computed: {
        routeLinksArray() {
          return routeLinksArray;
        }
      }
    }
  }, { notes: note });
