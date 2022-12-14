import assert from 'assert';
import { shallowMount } from '@vue/test-utils';
import { Text } from '@Components/atoms';

const factory = (propsData, slots) => {
  return shallowMount(Text, {
    propsData: {
      ...propsData
    },
    slots: {
      ...slots
    },
  });
};

describe('Text', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory(null, {
      default: '<span>This is Text Component</span>'
    });
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a paragraph tag', () => {
    assert.equal(wrapper.is('p'), true);
  });

  it('has only "text" class', () => {
    assert.equal(wrapper.classes(), 'text');
  });

  it('has slot handed as text', () => {
    assert.equal(wrapper.contains('span'), true);
    assert.equal(wrapper.find('span').text(), 'This is Text Component');
  });
});

describe('Text with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      error: true,
      exLarge: true,
    });
  });

  it('has a "text" class & classes of props handed', () => {
    assert.deepEqual(wrapper.classes(), [
      'text',
      'text--error',
      'text--ex-large',
    ]);
  });
});
