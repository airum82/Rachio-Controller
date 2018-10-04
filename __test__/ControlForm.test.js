import React from 'react';
import ControlForm from '../app/ControlForm';
import { shallow } from 'enzyme';

describe('ControlForm', () => {
  const mockRunZones = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ControlForm
      runZones={mockRunZones}
    />)
  })
  it('should match snapshot upon render', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('handleChange should call set state with correct params', () => {
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    const mockEvent = {
      target: {
        name: 'sarah',
        value: 'so much'
      }
    };
    wrapper.instance().handleChange(mockEvent);
    expect(spy).toHaveBeenCalledWith({ sarah: 'so much' })
  })
  it('form should call runZones on submit', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const mockDuration = wrapper.state().duration;
    wrapper.find('form').simulate('submit', mockEvent);
    expect(mockRunZones).toHaveBeenCalledWith(mockDuration, mockEvent);
  })
})