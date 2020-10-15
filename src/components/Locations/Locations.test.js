import React from 'react';
import Locations from './Locations.js';
import { mount } from  "enzyme";
import Enzyme from  "enzyme";
import Adapter from  "enzyme-adapter-react-16";
import locations from '../../api/json/locations.json';


Enzyme.configure({adapter: new Adapter() });



describe('<Locations />', () => {
 

  it('has delete button', (done) => {
    let wrapper;
    wrapper = mount(<Locations  userType="admin"/>, { disableLifecycleMethods: true });
    // keep an eye on the componentDidMount function
    const spyDidMount = jest.spyOn(Locations.prototype, 'componentDidMount');

    // mock up the api call
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations }),
    }));

    // manually call the componentDidMount lifecycle function
    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

    // since the componentDidMount is an async function,
    // it always a promise which can be chained with then.
    didMount.then(() => {
      // update the UI after the componentDidMount finishes
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('button.locationDelete');
   
        expect(result.length).toBeGreaterThan(0);

        // cleanup function for all mockups
        spyDidMount.mockRestore();
        fetch.mockClear();

        // must be called for async test
        done();
        wrapper.unmount();
      })
    })
  });

  it('button has click function', (done) => {
    let wrapper;
    wrapper = mount(<Locations  userType="admin"/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Locations.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('button.locationDelete');
        result.first().simulate('click');
        
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  });

 
  it('has pop up confirm', (done) => {
    let wrapper;
    wrapper = mount(<Locations  userType="admin"/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Locations.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('button.locationDelete');
        result.first().simulate('click');
        
        expect(wrapper.instance().state.show).toBe(true);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
}) 


 
  it('has bring up location name on the page', (done) => {
    let wrapper;
    wrapper = mount(<Locations  userType="admin"/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Locations.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('.locationName');
    
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  
 });


  it('has bring up locations description on the page', (done) => {
    let wrapper;
    wrapper = mount(<Locations  userType="admin"/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Locations.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: locations }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('.locationDes');
    
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  });




});






