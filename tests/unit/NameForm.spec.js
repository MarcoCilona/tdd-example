import { shallowMount } from '@vue/test-utils';

// Components
import NameForm from '@/components/NameForm.vue';

/**
 * 1. Component exists and its html is right
 * 2. Component contains input element
 * 3. Component contains submit button element
 * 4. A data is associated to input element
 * 5. After submit an event is emitted
 * 6. Check if the event emitted contains the input value
 * 7. After submit the input gets cleared
 */

/**
  * Se setto il value il data cambia
  */
describe('NameForm tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NameForm, {
      data: () => ({
        name: '',
      }),
    });
  });

  it('Componet does exists', () => {
    // Snapshot è solo a livello di dom?
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Component contains input element', () => {
    expect(wrapper.find('[data-test-id="inputTest"]').exists()).toBe(true);
  });

  it('Component contains button element', () => {
    expect(wrapper.find('[data-test-id="buttonTest"]').exists()).toBe(true);
  });

  it('Data prop is associated to input element', async () => {
    const inputElement = wrapper.find('[data-test-id="inputTest"]').element;
    const expectedValue = 'Insert name';

    wrapper.setData({
      name: expectedValue,
    });

    await wrapper.vm.$nextTick();
    expect(inputElement.value).toEqual(expectedValue);
  });

  it('After button click an event is emitted', () => {
    const buttonElement = wrapper.find('[data-test-id="buttonTest"]');

    buttonElement.trigger('click');

    expect(wrapper.emitted().submit).toBeTruthy();
  });

  it('After button click an event is emitted with input value as param', () => {
    const buttonElement = wrapper.find('[data-test-id="buttonTest"]');
    const nameToBeEmitted = 'Digitiamo';
    wrapper.setData({
      name: nameToBeEmitted,
    });

    buttonElement.trigger('click');

    expect(wrapper.emitted().submit[0][0]).toEqual(nameToBeEmitted);
  });

  it('After submit the input gets cleared', async () => {
    const buttonElement = wrapper.find('[data-test-id="buttonTest"]');
    const inputElement = wrapper.find('[data-test-id="inputTest"]').element;

    const nameToBeEmitted = 'Digitiamo';
    wrapper.setData({
      name: nameToBeEmitted,
    });

    buttonElement.trigger('click');
    expect(wrapper.emitted().submit[0][0]).toEqual(nameToBeEmitted);

    await wrapper.vm.$nextTick();
    expect(inputElement.value).toEqual('');
  });
});
