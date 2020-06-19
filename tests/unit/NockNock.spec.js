import { done, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import nock from 'nock';
import api from '@/api.ts';
import NockNock from '@/components/NockNock.vue';
import userFixture from './fixtures/User';

// Components

describe('Testing NockNock component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NockNock, {
      data: () => ({
        user: '',
      }),
    });
  });

  it('NockNock component is consistent', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Check get user api', async () => {
    const expectedUser = 'Digitiamo';

    const request = nock('https://api.github.com')
      .get(`/users/${expectedUser}`)
      .reply(200, userFixture);

    const result = await api.searchUser(expectedUser);
    await flushPromises();

    expect(result.name).toEqual(userFixture.name);
    expect(request.isDone()).toBe(true);
  });

  it('Check paragraph for user type exists', () => {
    expect(wrapper.find('[data-test-id="typeParagraph"]').exists()).toBe(true);
  });

  it('Check NockNock component has user data', () => {
    expect(wrapper.vm.$data.user).not.toBeUndefined();
  });

  it('Check button for retrieving user exists', () => {
    expect(wrapper.find('[data-test-id="userButton"]').exists()).toBe(true);
  });

  it('Check click on button updates the user object', async () => {
    const expectedUser = 'Castrogiovanni';
    nock('https://api.github.com')
      .get(`/users/${expectedUser}`)
      .reply(200, userFixture);
    const button = wrapper.find('[data-test-id="userButton"]');
    await button.trigger('click');

    await flushPromises();
    setTimeout(() => {
      expect(wrapper.find('[data-test-id="typeParagraph"]').element.textContent).toEqual(userFixture.name);
    }, 200);
  });
});
