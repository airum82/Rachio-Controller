import { App } from '../app/App';
import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />, {
      disableLifecycleMethods: true
    })
  })

  it('should match snapshot upon initial render', () => {
    expect(wrapper).toMatchSnapshot();
  })
})