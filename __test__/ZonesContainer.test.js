import React from 'react';
import ZonesContainer from '../app/ZonesContainer';
import { shallow } from 'enzyme';

describe('ZonesContainer', () => {
  it('should match snapshot upon render', () => {
    const mockZones = [{}, {}];
    const mockSelectZone = jest.fn();
    const wrapper = shallow(<ZonesContainer 
      zones={mockZones}
      selectZone={mockSelectZone}
    />)
    expect(wrapper).toMatchSnapshot();
  })
})