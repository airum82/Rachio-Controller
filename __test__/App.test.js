import { App } from '../app/App';
import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />, {
      disableLifecycleMethods: true
    })
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        id: 5864
      })
    }));
  })

  it('should match snapshot upon initial render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should match snapshot when isLoading is set to false', () => {
    wrapper.instance().setState({ isLoading: false});
    expect(wrapper).toMatchSnapshot();
  })

  it('retrieve person info should call fetch', () => {
    const mockId = 586;
    wrapper.instance().retrievePersonInfo(mockId);
    expect(window.fetch).toHaveBeenCalled();
  })

  it('retrieve person info should set state with userinfo', () => {
    const mockId = 586;
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    return wrapper.instance().retrievePersonInfo(mockId)
      .then(() => {
        expect(spy).toHaveBeenCalledWith({ isLoading: false, userInfo: { id: 5864} });
      })
  })

  it('should set state with error if fetch is unsuccessful', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
        message: 'user info not available'
    }))
    const mockId = 586;
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    return wrapper.instance().retrievePersonInfo(mockId)
      .then(() => {
        expect(spy).toHaveBeenCalledWith({ error: 'user info not available' });
      })
  })

  it('componentDidMount should call fetch', () => {
    wrapper = shallow(<App />);
    expect(window.fetch).toHaveBeenCalled();
  })

  it('componentDidMount should call retrievePersonInfo with correct params', async () => {
    wrapper = await shallow(<App />);
    const spy = await jest.spyOn(wrapper.instance(), 'retrievePersonInfo');
    expect(spy).toHaveBeenCalledWith(5864)
  })

  it('componentDidMount should set state with error message if unsuccessful', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      message: 'user info not available'
    }))
    wrapper = await shallow(<App />);
    const spy = await jest.spyOn(wrapper.instance(), 'setState');
    await wrapper.update();
    expect(spy).toHaveBeenCalledWith({ error: 'user info not available' });
  })

})