import assert from 'assert';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { RouterLink } from '@Components/atoms';

const factory = (propsData, slots) => {
  return shallowMount(RouterLink, {
    stubs: {
      RouterLink: RouterLinkStub,
    },
    propsData: {
      ...propsData
    },
    slots: {
      ...slots
    },
  });
};

describe('Router Link', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory(null, {
      default: '<span>router link</span>',
    });
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a anchor tag', () => {
    assert.equal(wrapper.contains(RouterLinkStub), true);
  });

  it('has a only "router-link" class', () => {
    assert.equal(wrapper.classes(), 'router-link');
  });

  it('has default attributes', () => {
    assert.equal(wrapper.props().to, '');
    assert.equal(wrapper.props().activeClass, '');
    assert.equal(wrapper.props().exactActiveClass, '');
  });

  it('has text as slot', () => {
    assert.equal(wrapper.contains('span'), true);
    assert.equal(wrapper.find('span').text(), 'router link');
  });
});

describe('Router Link with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      to: '/path',
      activeClass: 'active',
      exactActiveClass: 'exact-active',
      block: true,
      large: true,
      small: true,
      underline: true,
      keyColor: true,
      white: true,
      round: true,
    });
  });

  it('has props attributes', () => {
    assert.equal(wrapper.props().to, '/path');
    assert.equal(wrapper.props().activeClass, 'active');
    assert.equal(wrapper.props().exactActiveClass, 'exact-active');
  });

  it('has a "router-link" class & props classes', () => {
    assert.deepEqual(wrapper.classes(), [
      'router-link',
      'router-link--block',
      'router-link--large',
      'router-link--small',
      'router-link--underline',
      'router-link--key-color',
      'router-link--white',
      'router-link--round',
    ]);
  });
});
