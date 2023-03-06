import { storiesOf } from '@storybook/vue';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import note from './README.md';

const levelDefaultValue = '1';

const levelOptions = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
};

storiesOf('ATOMS|Heading', module)
.addDecorator(withKnobs)
.add('default', () => {
  return {
    template: `<app-heading
                :level="level"
                :class-name="className"
              >
                見出しテキストが入ります
              </app-heading>`,
    props: {
      level: {
        type: Number,
        default: select('level', levelOptions),
      },
      className: {
        type: String,
        default: '',
      }
    },
  }
},{ notes: note });