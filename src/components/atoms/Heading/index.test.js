import assert from 'assert';
import { shallowMount } from '@vue/test-utils';
import { Heading } from '@Components/atoms';

const factory = (propsData, slotsData) => {
  return shallowMount(Heading, {
    propsData: {
      ...propsData
    },
    slots: {
      ...slotsData
    },
  });
};

describe('Heading', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory(null, {
      default: '<span>This is Heading Component</span>'
    });
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a h1 tag', () => {
    assert.equal(wrapper.is('h1'), true);
  });

  it('has text in slot', () => {
    assert.equal(wrapper.contains('span'), true);
    assert.equal(wrapper.find('span').text(), 'This is Heading Component');
  });
});

describe('Heading with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      level: 2,
      className: 'test__heading',
    });
  });

  it('is a h2 tag', () => {
    assert.equal(wrapper.is('h2'), true);
  });

  it('has a class of className props', () => {
    assert.equal(wrapper.classes(), 'test__heading');
  });
});

describe('Heading with level prop 1 to 7', () => {
  let wrapper;
  let index = 0;
  beforeEach(() => {
    wrapper = factory({
      level: index += 1,
    });
  });

  it('is a h1 tag', () => {
    assert.equal(wrapper.contains('h1'), true);
    assert.equal(wrapper.classes(), 'heading--primary');
  });
  it('is a h2 tag', () => {
    assert.equal(wrapper.is('h2'), true);
    assert.equal(wrapper.classes(), 'heading--secondary');
  });
  it('is a h3 tag', () => {
    assert.equal(wrapper.is('h3'), true);
    assert.equal(wrapper.classes(), 'heading--tertiary');
  });
  it('is a h4 tag', () => {
    assert.equal(wrapper.is('h4'), true);
    assert.equal(wrapper.classes(), 'heading--quaternary');
  });
  it('is a h5 tag', () => {
    assert.equal(wrapper.is('h5'), true);
    assert.equal(wrapper.classes(), 'heading--quinary');
  });
  it('is a h6 tag', () => {
    assert.equal(wrapper.is('h6'), true);
    assert.equal(wrapper.classes(), 'heading--senary');
  });

  it('is a h1 tag when level is more then 6', () => {
    assert.equal(wrapper.is('h1'), true);
    assert.equal(wrapper.classes(), 'heading--primary');
  });
});
