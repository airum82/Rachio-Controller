import React from 'react';
import DevicesContainer from '../app/DevicesContainer';
import { shallow } from 'enzyme';

describe('DevicesContainer', () => {
  it('should match snapshot upon initial render', () => {
    const wrapper = shallow(<DevicesContainer devices={[{}, {}]}/>);
    expect(wrapper).toMatchSnapshot();
  })
})
