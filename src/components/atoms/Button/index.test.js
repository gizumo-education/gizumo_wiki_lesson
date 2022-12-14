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
  beforeAll(() => {
    wrapper = factory(null, {
      default: 'テストボタン'
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('has a default attribute', () => {
    expect(wrapper.attributes().type).toBe('button');
    expect(wrapper.attributes()).not.toHaveProperty('disabled');
  });

  it('has only "button" class', () => {
    expect(wrapper.classes()).toContain('button');
  });

  it('has slot handed as text', () => {
    expect(wrapper.text()).toBe('テストボタン');
  });

  it('has emitted "click" event when button was clicked', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click').length).toBe(1);
  });
});

describe('Button with props', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory({
      buttonType: 'submit',
      block: true,
      disabled: true,
    });
  });

  it('has a props attribute', () => {
    expect(wrapper.attributes().type).toBe('submit');
    expect(wrapper.attributes().disabled).toBe('disabled');
  });

  it('has a given classes', () => {
    expect(wrapper.classes()).toEqual([
      'button',
      'button--block',
      'button--disabled',
    ]);
  });
});
