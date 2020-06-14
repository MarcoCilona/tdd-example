import { createLocalVue, mount } from '@vue/test-utils';
import App from '@/App.vue';

import VueRouter from 'vue-router';
import { routes } from '@/router/index';

//  Components
import Home from '@/views/Home.vue';
import MoreGreetings from '@/views/MoreGreetings.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

/**
 * Test needed:
 * 1. Componente App exists and its the app container;
 * 2. First access App is pointing to '/' route
 * 3. App contains Home component
 * 4. When route changes to '/more-greetings' App contains MoreGreetings component
 */
describe('App tests', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = new VueRouter({ routes });
    wrapper = mount(App, {
      localVue,
      router,
      data: () => ({
        name: '',
      }),
    });
  });

  it('App component exists and is rendered right', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('App components its the main application wrapper', () => {
    expect(wrapper.find('#app').exists()).toBe(true);
  });

  it('First access App is pointing to "/" route', () => {
    expect(wrapper.vm.$route.path).toEqual('/');
  });

  it('First access App contains Home component', () => {
    expect(wrapper.findComponent(Home).exists()).toBe(true);
  });

  it('When routes is "/more-greetings" the App contains MoreGreetings component', async () => {
    router.push('/more-greetings/name');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(MoreGreetings).exists()).toBe(true);
  });
});
