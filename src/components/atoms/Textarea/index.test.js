import { shallowMount } from '@vue/test-utils';
import { Textarea } from '@Components/atoms';

const factory = (propsData) => {
  return shallowMount(Textarea, {
    propsData: {
      ...propsData
    },
  });
};

describe('Textarea', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('has a default value', () => {
    expect(wrapper.find('textarea').element.value).toBe('');
  });

  it('has a default attributes', () => {
    expect(wrapper.find('textarea').attributes().name).toBe('inputName');
    expect(wrapper.find('textarea').attributes().placeholder).toBe('入力してください');
    expect(wrapper.find('textarea').attributes().required).toBe('required');
  });

  it('has only "textarea" class', () => {
    expect(wrapper.find('textarea').classes()).toContain('textarea');
  });
});

describe('Input with props', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory({
      name: 'testTextarea',
      placeholder: 'テスト',
      required: false,
      value: 'テスト',
      whiteBg: true,
    });
  });

  it('has a props value', () => {
    expect(wrapper.find('textarea').element.value).toBe('テスト');
  });

  it('has props attributes', () => {
    expect(wrapper.find('textarea').attributes().name).toBe('testTextarea');
    expect(wrapper.find('textarea').attributes().placeholder).toBe('テスト');
    expect(wrapper.find('textarea').attributes()).not.toHaveProperty('required');
  });

  it('has a given classes', () => {
    expect(wrapper.find('textarea').classes()).toEqual([
      'textarea',
      'textarea--white-bg',
    ]);
  });

  it('has emitted "textarea" event when textarea value was changed', () => {
    wrapper.find('textarea').setValue('emitイベント発火');

    expect(wrapper.emitted('update-value')).toBeTruthy();
    expect(wrapper.emitted('update-value').length).toBe(1);
    expect(wrapper.emitted('update-value')[0][0].target.value).toBe('emitイベント発火');
  });
});
