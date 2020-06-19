import { createLocalVue, shallowMount } from '@vue/test-utils';

// Components
import NameView from '@/components/NameView.vue';

import VueRouter from 'vue-router';
import { routes } from '@/router/index';

const localVue = createLocalVue();
localVue.use(VueRouter);

/**
 * 1. Components does exists
 * 2. Component contains a paragraph element
 * 3. Component has a name property
 * 4. Component is printing 'Hello ${name}' inside a paragraph
 * 5. Component contains button to go to more greetings
 * 5. When button is clicked the app gets redirect
 * 6. The new route contains the name property
 */
describe('NewView tests', () => {
  let wrapper;
  let router;
  beforeEach(() => {
    router = new VueRouter({ routes, mode: 'abstract' });
    wrapper = shallowMount(NameView, {
      localVue,
      router,
      propsData: {
        name: '',
      },
    });
  });

  it('Components does exists', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Components contains a paragraph element', () => {
    expect(wrapper.find('[data-test-id="paragraphTest"]').exists()).toBe(true);
  });

  it('Components has a name property', () => {
    expect(wrapper.props().name).not.toBeUndefined();
  });

  it('Name prop is shown inside paragraph', async () => {
    const paragraph = wrapper.find('[data-test-id="paragraphTest"]').element;
    const nameToBeShown = 'Digitiamo';
    wrapper.setProps({
      name: nameToBeShown,
    });

    await wrapper.vm.$nextTick();
    expect(paragraph.textContent).toEqual('Hello Digitiamo');
  });

  it('Component contains button to go to more greetings', () => {
    expect(wrapper.find('[data-test-id="greetingsButton"]').exists()).toBe(true);
  });

  it('When button is clicked the app gets redirect', async () => {
    const previousPath = wrapper.vm.$route.path;
    const button = wrapper.find('[data-test-id="greetingsButton"]');
    await button.trigger('click');

    expect(wrapper.vm.$route.path).not.toEqual(previousPath);
  });

  it('The new route contains the name property', async () => {
    const button = wrapper.find('[data-test-id="greetingsButton"]');
    wrapper.setProps({
      name: 'Digitiamo',
    });
    await button.trigger('click');

    expect(wrapper.vm.$route.params.name).toEqual(wrapper.props().name);
  });
});
