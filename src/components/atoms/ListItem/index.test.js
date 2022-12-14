import assert from 'assert';
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
  beforeEach(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a input tag', () => {
    assert.equal(wrapper.is('li'), true);
  });

  it('has a only "list-item" class', () => {
    assert.equal(wrapper.classes(), 'list-item');
  });
});

describe('List Item with slot', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory(null, {
      default: '<div>test</div>',
    });
  });

  it('has text as slot', () => {
    assert.equal(wrapper.contains('div'), true);
    assert.equal(wrapper.find('div').text(), 'test');
  });
});
