import assert from 'assert';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import veeValidate from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { Input } from '@Components/atoms';

const localVue = createLocalVue();
localVue.use(veeValidate, { locale: ja });

const factory = (propsData) => {
  return shallowMount(Input, {
    localVue,
    sync: false,
    propsData: {
      ...propsData
    },
  });
};

describe('Input', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a input tag', () => {
    assert.equal(wrapper.is('div'), true);
  });

  it('has a default value', done => {
    wrapper.vm.$nextTick(() => {
      assert.equal(wrapper.vm.value, '');
      done();
    });
  });

  it('has default attributes', done => {
    wrapper.vm.$nextTick(() => {
      assert.equal(wrapper.vm.name, 'inputName');
      assert.equal(wrapper.vm.type, 'text');
      assert.equal(wrapper.vm.placeholder, '入力してください');
      assert.equal(wrapper.vm.required, false);
      assert.equal(wrapper.vm.value, '');
      assert.equal(wrapper.vm.whiteBg, false);
      assert.equal(wrapper.vm.vvas, '');
      done();
    });
  });

  it('has only "input" class', done => {
    wrapper.vm.$nextTick(() => {
      assert.deepEqual(wrapper.find('input').classes(), [
        'input',
      ]);
      done();
    });
  });
});

describe('Input with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      name: 'testInput',
      type: 'email',
      placeholder: 'テスト',
      required: true,
      value: 'テスト',
      whiteBg: true,
      vvas: 'eメール',
    });
  });

  it('has a props value', done => {
    wrapper.vm.$nextTick(() => {
      assert.equal(wrapper.vm.value, 'テスト');
      done();
    });
  });

  it('has props attributes', done => {
    wrapper.vm.$nextTick(() => {
      assert.equal(wrapper.vm.name, 'testInput');
      assert.equal(wrapper.vm.type, 'email');
      assert.equal(wrapper.vm.placeholder, 'テスト');
      assert.equal(wrapper.vm.whiteBg, true);
      assert.equal(wrapper.vm.required, true);
      assert.equal(wrapper.vm.vvas, 'eメール');
      done();
    });
  });

  it('has props classes', done => {
    wrapper.vm.$nextTick(() => {
      assert.deepEqual(wrapper.find('input').classes(), [
        'input',
        'input--white-bg',
      ]);
      done();
    });
  });

  it('has emitted "input" event when input value was changed', done => {
    wrapper.vm.$nextTick(() => {
      wrapper.find('input').trigger('input');
      assert.ok(wrapper.emitted().updateValue);
      done();
    });
  });
});
