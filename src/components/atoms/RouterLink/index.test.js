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
  beforeAll(() => {
    wrapper = factory({
      to: '/test'
    }, {
      default: 'リンクテキスト',
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('is a anchor tag', () => {
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
  });

  it('has a only "router-link" class', () => {
    expect(wrapper.classes()).toContain('router-link');
  });

  it('has a props attributes', () => {
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/test');
  });

  it('has text as slot', () => {
    expect(wrapper.text()).toBe('リンクテキスト');
  });
});

describe('Router Link with props', () => {
  let wrapper;
  beforeAll(() => {
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
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/path');
    expect(wrapper.findComponent(RouterLinkStub).props().activeClass).toBe('active');
    expect(wrapper.findComponent(RouterLinkStub).props().exactActiveClass).toBe('exact-active');
  });

  it('has a given classes', () => {
    expect(wrapper.classes()).toEqual([
      'router-link',
      'router-link--block',
      'router-link--large',
      'router-link--small',
      'router-link--underline',
      'router-link--white',
      'router-link--round',
    ]);
  });
});
