import { shallowMount, createLocalVue } from '@vue/test-utils';
import veeValidate from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { Input } from '@Components/atoms';

const localVue = createLocalVue();
localVue.use(veeValidate, { locale: ja });

const factory = (propsData) => {
  return shallowMount(Input, {
    localVue,
    propsData: {
      ...propsData
    },
  });
};

describe('Input', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('has a default value', () => {
    expect(wrapper.find('input').element.value).toBe('');
  });

  it('has default attributes', () => {
    expect(wrapper.find('input').attributes().name).toBe('inputName');
    expect(wrapper.find('input').attributes().type).toBe('text');
    expect(wrapper.find('input').attributes().placeholder).toBe('入力してください');
    expect(wrapper.find('input').attributes()).not.toHaveProperty('required');
  });

  it('has only "input" class', () => {
    expect(wrapper.find('input').classes()).toContain('input');
  });
});

describe('Input with props', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = factory({
      name: 'testInput',
      type: 'email',
      placeholder: 'テスト',
      required: true,
      value: 'テスト',
      whiteBg: true,
    });
  });

  it('has a value', () => {
    expect(wrapper.find('input').element.value).toBe('テスト');
  });

  it('has props attributes', () => {
    expect(wrapper.find('input').attributes().name).toBe('testInput');
    expect(wrapper.find('input').attributes().type).toBe('email');
    expect(wrapper.find('input').attributes().placeholder).toBe('テスト');
    expect(wrapper.find('input').attributes().required).toBe('required');
  });

  it('has a given classes', () => {
    expect(wrapper.find('input').classes()).toEqual(['input', 'input--white-bg']);
  });

  it('has emitted "input" event when input value was changed', () => {
    wrapper.find('input').setValue('テスト');

    expect(wrapper.emitted('update-value')).toBeTruthy();
    expect(wrapper.emitted('update-value').length).toBe(1);
    expect(wrapper.emitted('update-value')[0][0].target.value).toBe('テスト');
  });
});
