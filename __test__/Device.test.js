import React from 'react';
import Device from '../app/Device';
import { shallow } from 'enzyme';

describe('Device', () => {
  let wrapper;
  const mockProps = {
    history: jest.fn(),
    zones: [{}, {}],
    id: '58493-a',
    name: 'avenger-7-fold'
  };
  beforeEach(() => {
    wrapper = shallow(<Device
      history={mockProps.history}
      zones={mockProps.zones}
      id={mockProps.id}
      name={mockProps.name}
    />);
  })
  it('should match snapshot upon initial render', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('runAllZones should call fetch', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const mockDuration = '70';
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    wrapper.instance().runAllZones(mockDuration, mockEvent);
    expect(window.fetch).toHaveBeenCalled();
  })
  it('runAllZones should setstate with error if unsuccessful', async () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const mockDuration = '70';
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      message: 'could not start zones'
    }));
    const spy = await jest.spyOn(wrapper.instance(), 'setState');
    await wrapper.instance().runAllZones(mockDuration, mockEvent);
    expect(spy).toHaveBeenCalledWith({ error: 'could not start zones' });
  })
  it('select zone should add zone to selected zones if not selected', () => {
    const mockId = '596-a';
    wrapper.instance().selectZone(mockId);
    expect(wrapper.state().selectedZones[0]).toEqual(mockId);
  })
  it('selectZone should remove zone id from list if not there', () => {
    const mockId = '596-a';
    wrapper.instance().setState({ selectedZones: ['596-a'] });
    wrapper.instance().selectZone(mockId);
    expect(wrapper.state().selectedZones.length).toEqual(0);
  })


})