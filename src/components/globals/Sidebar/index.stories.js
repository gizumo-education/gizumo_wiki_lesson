import { storiesOf } from '@storybook/vue';
import storyRouter from 'storybook-vue-router';

import note from './README.md';

const routeLinksArray = [];

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
