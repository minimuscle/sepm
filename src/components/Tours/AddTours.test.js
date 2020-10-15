import React from 'react';
import AddTours from './AddTours.js';
import { mount } from  "enzyme";
import Enzyme from  "enzyme";
import Adapter from  "enzyme-adapter-react-16";
import types from '../../api/json/types.json';
import locations from '../../api/json/locations.json';

Enzyme.configure({adapter: new Adapter() });

describe('<AddTours />', () => {

it('has bring up choose location and choose tour type ', (done) => {
    let wrapper;
    wrapper = mount(<AddTours/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(AddTours.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations, types}),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('.addform');
    
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  
 });

 it('has add tour type functions ', (done) => {
    let wrapper;
    wrapper = mount(<AddTours/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(AddTours.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations, types}),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('.addtourtypebutton');
    
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })

  
 });

 it('has add tour type inputfield ', (done) => {
    let wrapper;
    wrapper = mount(<AddTours/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(AddTours.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations, types}),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('.addinput');
    
        expect(result.props().value).toBe(undefined);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
    
  
 });
});