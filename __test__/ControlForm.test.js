import React from 'react';
import ControlForm from '../app/ControlForm';
import { shallow } from 'enzyme';

describe('ControlForm', () => {
  const mockRunAllZones = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ControlForm
      runAllZones={mockRunAllZones}
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
  it('form should call runAllZones on submit', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const mockDuration = wrapper.state().duration;
    wrapper.find('form').simulate('submit', mockEvent);
    expect(mockRunAllZones).toHaveBeenCalledWith(mockDuration, mockEvent);
  })
})