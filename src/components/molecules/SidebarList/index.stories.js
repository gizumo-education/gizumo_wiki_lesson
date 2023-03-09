import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import storyRouter from 'storybook-vue-router';
import note from './README.md';

const classNameDefaultValue = 'none';

const classNameOptions = {
  'none': '',
}

const targetArray = [
  {
    id: 1,
    name: 'HOME',
    path: '/',
  },
  {
    id: 2,
    name: 'カテゴリー',
    path: '/categories',
  },
  {
    id: 3,
    name: '記事',
    path: '/all/articles',
  },
  {
    id: 4,
    name: 'ユーザー',
    path: '/users',
  },
]

storiesOf('MOLECULES|SidebarList', module)
  .addDecorator(storyRouter())
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      render: h => h('app-sidebar-list', {
        props: {
          targetArray: targetArray,
          className: 'sidebar-list',
        },
      }),
    }
  }, { notes: note });