import { createLocalVue, mount } from '@vue/test-utils';

import VueRouter from 'vue-router';
import { routes } from '@/router/index';

// Components
import MoreGreetings from '@/views/MoreGreetings.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

/**
 * 1. Check if MoreGreetings component html is rendered correctly
 * 2. Check if More Greetings has a name data
 * 3. Check if More Greeting has a h1 element and a paragraph element
 * 4. Check if title displays name variable
 * 5. Check if paragraph contains text "Watch out, ${name} is coming"
 * 6. Check if, on created, data is equal to route name param
 */
describe('MoreGreetings tests', () => {
  let router;
  let wrapper;

  beforeEach(() => {
    router = new VueRouter({ routes, mode: 'abstract' });
    router.push('/more-greetings/Digitiamo');
    wrapper = mount(MoreGreetings, {
      localVue,
      router,
    });
  });

  it('Check MoreGreetings html', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Check if More Greetings has a name data', async () => {
    wrapper.setData({
      name: '',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.name).not.toBeUndefined();
  });

  it('Check if MoreGreetings has h1 and paragraph elements', () => {
    expect(wrapper.find('[data-set-id="titleTest"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-set-id="paragraphGreetingsTest"]').exists()).toBeTruthy();
  });

  it('Check if title displays name variable', async () => {
    const titleWrapper = wrapper.find('[data-set-id="titleTest"]').element;
    const testName = 'Digitiamo';
    wrapper.setData({
      name: testName,
    });

    await wrapper.vm.$nextTick();

    expect(titleWrapper.textContent).toEqual(testName);
  });

  it('Check if paragraph contains text "Watch out, name is coming"', async () => {
    const paragraphWrapper = wrapper.find('[data-set-id="paragraphGreetingsTest"]').element;
    const name = 'Digitiamo';
    wrapper.setData({
      name,
    });
    expect(paragraphWrapper.textContent).toEqual(`Watch out, ${name} is coming`);
  });

  it('Check if, on created, data is equal to route name param', async () => {
    const name = 'Digitiamo';

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.name).toEqual(name);
  });
});
