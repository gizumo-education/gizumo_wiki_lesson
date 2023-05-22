import { shallowMount } from '@vue/test-utils';
import { ListItem } from '@Components/atoms';

const factory = (propsData, slots) => {
  return shallowMount(ListItem, {
    propsData: {
      ...propsData
    },
    slots: {
      ...slots
    },
  });
};

describe('List Item', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('has a only "list-item" class', () => {
    expect(wrapper.classes()).toContain('list-item');
  });
});

describe('List Item with slot', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory({
      flex: true,
      beetween: true,
    }, {
      default: '<div>test</div>',
    });
  });

  it('has text as slot', () => {
    expect(wrapper.find('div')).toBeTruthy();
    expect(wrapper.find('div').text()).toBe('test');
  });

  it('has a given classes', () => {
    expect(wrapper.classes()).toEqual([
      'list-item',
      'list-item--flex',
      'list-item--space-beetween',
    ]);
  });
});
