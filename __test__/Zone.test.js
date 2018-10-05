import React from 'react';
import Zone from '../app/Zone';
import { shallow } from 'enzyme';

describe('Zone', () => {
  let wrapper;
  const mockProps = {
    name: 'zone-4000',
    id: '45-7c',
    selectZone: jest.fn(),
    image: '',
    enabled: true,
    addSortOrder: jest.fn()
  }
  beforeEach(() => {
    wrapper = shallow(<Zone
      name={mockProps.name}
      id={mockProps.id}
      selectZone={mockProps.selectZone}
      image={mockProps.image}
      enabled={mockProps.enabled}
      addSortOrder={mockProps.addSortOrder}
    />)
  })
  it('should match snapshot upon initial render', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('toggleForm should set state with opposite boolean value if zone is enabled', () => {
    const initialValue = wrapper.state().showForm;
    wrapper.instance().toggleForm();
    expect(!wrapper.state().showForm).toEqual(initialValue);
  })
  it('toggle form should call handle disabled if zone is disabled', () => {
    wrapper = shallow(<Zone
      name="I'm not working"
      id="not-me"
      selectZone={jest.fn()}
      image={''}
      enabled={false}
       />)
    const spy = jest.spyOn(wrapper.instance(), 'handleDisabled');
    wrapper.instance().toggleForm();
    expect(spy).toHaveBeenCalled();
  })
  it('handleInput should set state with value of input', () => {
    wrapper.instance().toggleForm();
    const mockEvent = {
      target: {
        value: 'hi',
        name: 'bob'
      }
    }
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    wrapper.instance().handleInput(mockEvent);
    expect(spy).toHaveBeenCalledWith({ bob: 'hi' });  
  })
  it('handle select should set state with opposite boolean value of select', () => {
    const initialValue = wrapper.state().selected;
    wrapper.instance().handleSelect();
    expect(!wrapper.state().selected).toEqual(initialValue)
  })
  it('handle select should call handleDisabled if zone is disabled', () => {
    wrapper = shallow(<Zone
      name="I'm not working"
      id="not-me"
      selectZone={jest.fn()}
      image={''}
      enabled={false}
    />)
    const spy = jest.spyOn(wrapper.instance(), 'handleDisabled');
    wrapper.instance().handleSelect();
    expect(spy).toHaveBeenCalled();
  })
  it('grabSortOrder should call addSortOrder with correct params', () => {
    const mockEvent = {
      target: {
        value: '5'
      }
    }
    wrapper.instance().grabSortOrder(mockEvent);
    expect(mockProps.addSortOrder).toHaveBeenCalledWith(mockProps.id, mockEvent.target.value);
  })
  it('startZone should call fetch', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      text: () => Promise.resolve({})
    }))
    wrapper.instance().startZone(mockEvent);
    expect(window.fetch).toHaveBeenCalled();
  })
  it('startZone should call toggleForm', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      text: () => Promise.resolve({})
    }));
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const spy = jest.spyOn(wrapper.instance(), 'toggleForm');
    return wrapper.instance().startZone(mockEvent)
      .then(() => {
        expect(spy).toHaveBeenCalled();
      })
  })
  it('startZone should set state with message of fetch fails', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      message: 'Could not start zone'
    }))
    const mockEvent = {
      preventDefault: jest.fn()
    }
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    return wrapper.instance().startZone(mockEvent)
      .then(() => {
        expect(spy).toHaveBeenCalledWith({ error: 'Could not start zone' });
      })
  })
  it('toggle-form button should call toggleForm', () => {
    const spy = jest.spyOn(wrapper.instance(), 'toggleForm');
    wrapper.find('.toggle-form').simulate('click');
    wrapper.find('.toggle-form').simulate('click');
    expect(spy).toHaveBeenCalled();
  })
  it('image should call handleSelect when clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSelect');
    wrapper.find('img').simulate('click');
    wrapper.find('img').simulate('click');
    expect(spy).toHaveBeenCalled();
  })
  it('select button should call handleSelect when clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSelect');
    wrapper.find('.select-zone').simulate('click');
    wrapper.find('.select-zone').simulate('click');
    expect(spy).toHaveBeenCalled();
  })
  it('input field should call handleInput on change', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInput');
    wrapper.find('.duration-input').simulate('change', {
      target: {
        name:'jenny',
        value: 'hey'
      }
    })
    wrapper.find('.duration-input').simulate('change', {
      target: {
        name: 'jenny',
        value: 'hey'
      }
    })
    expect(spy).toHaveBeenCalled();
  })
  it('sort-order input should call grabSortOrder on change', () => {
    const spy = jest.spyOn(wrapper.instance(), 'grabSortOrder');
    wrapper.instance().setState({ selected: true });
    const mockEvent = {
      target: {
        value: '5'
      }
    }
    wrapper.find('.sort-order').simulate('change', mockEvent)
    wrapper.find('.sort-order').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalledWith(mockEvent);
  })
})