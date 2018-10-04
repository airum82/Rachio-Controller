import React from 'react';
import Device from '../app/Device';
import { shallow } from 'enzyme';

describe('Device', () => {
  let wrapper;
  const mockProps = {
    history: {
      goBack: jest.fn()
    },
    zones: [{ id: '83-b' }, { id: '74-ty' }],
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
  it('runZones should call fetch', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const mockDuration = '70';
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    wrapper.instance().runZones(mockDuration, mockEvent);
    expect(window.fetch).toHaveBeenCalled();
  })
  it('runZones should setstate with error if unsuccessful', async () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const mockDuration = '70';
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      message: 'could not start zones'
    }));
    const spy = await jest.spyOn(wrapper.instance(), 'setState');
    await wrapper.instance().runZones(mockDuration, mockEvent);
    expect(spy).toHaveBeenCalledWith({ error: 'could not start zones' });
  })
  it('select zone should add zone to selected zones if not selected', () => {
    const mockId = '596-a';
    const mockSortOrder = '5'
    wrapper.instance().selectZone(mockId, mockSortOrder);
    expect(wrapper.state().selectedZones[0]).toEqual({
      id: mockId,
      sortOrder: mockSortOrder
    });
  })
  it('selectZone should remove zone from list if there there', () => {
    const mockId = '596-a';
    wrapper.instance().setState({ selectedZones: [{id: '596-a'}] });
    wrapper.instance().selectZone(mockId);
    expect(wrapper.state().selectedZones.length).toEqual(0);
  })
  it('componentDidMount should set state with zone ids', async () => {
    const spy = await jest.spyOn(wrapper.instance(), 'setState');
    wrapper.instance().componentDidMount();
    await wrapper.update();
    expect(spy).toHaveBeenCalledWith({ zoneIdList: ['83-b', '74-ty'] });
  })
  it('back button should call history.goBack', () => {
    wrapper.find('.back-button').simulate('click');
    expect(mockProps.history.goBack).toHaveBeenCalled();
  })
})