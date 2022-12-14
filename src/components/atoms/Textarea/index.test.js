import assert from 'assert';
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
  beforeEach(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a textarea tag', () => {
    assert.equal(wrapper.is('textarea'), true);
  });

  it('has a default value', () => {
    assert.equal(wrapper.element.value, '');
  });

  it('has a default attributes', () => {
    assert.equal(wrapper.attributes('name'), 'inputName');
    assert.equal(wrapper.attributes('placeholder'), '入力してください');
    assert.equal(wrapper.attributes('required'), 'required');
  });

  it('has only "input" class', () => {
    assert.equal(wrapper.classes(), 'textarea');
  });
});

describe('Input with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      name: 'testTextarea',
      placeholder: 'テスト',
      required: false,
      value: 'テスト',
      whiteBg: true,
    });
  });

  it('has a props value', () => {
    assert.equal(wrapper.element.value, 'テスト');
  });

  it('has props attributes', () => {
    assert.equal(wrapper.attributes('name'), 'testTextarea');
    assert.equal(wrapper.attributes('placeholder'), 'テスト');
    assert.equal(wrapper.attributes('required'), undefined);
  });

  it('has props classes', () => {
    assert.deepEqual(wrapper.classes(), [
      'textarea',
      'textarea--white-bg',
    ]);
  });

  it('has emitted "input" event when textarea value was changed', () => {
    wrapper.trigger('input');
    assert.ok(wrapper.emitted().updateValue);
  });
});
