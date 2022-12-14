import assert from 'assert';
import { shallowMount } from '@vue/test-utils';
import { Button } from '@Components/atoms';

const factory = (propsData, slots) => {
  return shallowMount(Button, {
    propsData: {
      ...propsData
    },
    slots: {
      ...slots
    },
  });
};

describe('Button', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory(null, {
      default: '<span>This is Button Component</span>'
    });
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a button tag', () => {
    assert.equal(wrapper.is('button'), true);
  });

  it('has a default attribute', () => {
    assert.equal(wrapper.attributes('type'), 'button');
  });

  it('has only "button" class', () => {
    assert.equal(wrapper.classes(), 'button');
  });

  it('has slot handed as text', () => {
    assert.equal(wrapper.contains('span'), true);
    assert.equal(wrapper.find('span').text(), 'This is Button Component');
  });

  it('has emitted "click" event when button was clicked', () => {
    wrapper.trigger('click');
    assert.ok(wrapper.emitted().click);
  });
});

describe('Button with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      buttonType: 'submit',
      block: true,
      disabled: true,
    });
  });

  it('has a props attribute', () => {
    assert.equal(wrapper.attributes('type'), 'submit');
  });

  it('has a "button" class & classes of props handed', () => {
    assert.deepEqual(wrapper.classes(), [
      'button',
      'button--block',
      'button--disabled',
    ]);
  });
});
