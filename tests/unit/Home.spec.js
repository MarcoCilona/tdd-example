import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

//  Components
import NameForm from '@/components/NameForm.vue';
import NameView from '@/components/NameView.vue';

/**
 * Test needed:
 * 1. Componente Home exists and its the app container;
 * 2. Home component contains NameForm and NameView components
 * 3. Home saves the name retrieved from NameForm and saves it inside a variable
 * 4. Home passes the name saved to NameView component
 */
describe('Home tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      data: () => ({
        name: '',
      }),
    });
  });

  it('Home component exists and is rendered right', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Home component contains NameForm component', () => {
    expect(wrapper.findComponent(NameForm).exists()).toBe(true);
  });

  it('Home component contains NameView component', () => {
    expect(wrapper.findComponent(NameView).exists()).toBe(true);
  });

  it('Home save the name retrieved from NameForm', async () => {
    const nameFormWrapper = wrapper.findComponent(NameForm);
    const nameToBeSaved = 'Digitiamo';
    nameFormWrapper.vm.$emit('submit', nameToBeSaved);

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.name).toEqual(nameToBeSaved);
  });

  it('Home is passing the name to NameView component', async () => {
    const nameViewWrapper = wrapper.findComponent(NameView);
    const nameToBeSaved = 'Digitiamo';
    wrapper.setData({
      name: nameToBeSaved,
    });

    await wrapper.vm.$nextTick();
    expect(nameViewWrapper.props().name).toEqual(wrapper.vm.$data.name);
  });
});
