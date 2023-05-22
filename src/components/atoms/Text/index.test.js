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
  beforeAll(() => {
    wrapper = factory(null, {
      default: 'ダミーテキスト'
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('is a paragraph tag', () => {
    expect(wrapper.element.tagName).toBe('P');
  });

  it('has only "text" class', () => {
    expect(wrapper.classes()).toContain('text');
  });

  it('has text as slot', () => {
    expect(wrapper.text()).toBe('ダミーテキスト');
  });
});

describe('Text with props', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory(
      {
        tag: 'div',
        error: true,
        exLarge: true,
      },
      { default: '<span>spanテキスト</span>' }
    );
  });

  it('is a div tag', () => {
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('has text as slot', () => {
    expect(wrapper.find('span')).toBeTruthy();
    expect(wrapper.find('span').text()).toBe('spanテキスト');
  });

  it('has a given classes', () => {
    expect(wrapper.classes()).toEqual([
      'text',
      'text--error',
      'text--ex-large',
    ]);
  });
});
