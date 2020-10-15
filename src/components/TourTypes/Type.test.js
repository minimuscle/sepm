
import React from 'react';
import Types from './Types.js';
import { mount } from  "enzyme";
import Enzyme from  "enzyme";
import Adapter from  "enzyme-adapter-react-16";
import types from '../../api/json/types.json';


Enzyme.configure({adapter: new Adapter() });



describe('<Types />', () => {
 

  it('has delete button', (done) => {
    let wrapper;
    wrapper = mount(<Types userType="admin"/>, { disableLifecycleMethods: true });
    // keep an eye on the componentDidMount function
    const spyDidMount = jest.spyOn(Types.prototype, 'componentDidMount');

    // mock up the api call
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: types }),
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
        const result = wrapper.find('button.typeButton');
     
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

  it('has click function', (done) => {
    let wrapper;
    wrapper = mount(<Types userType="admin"/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Types.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: types }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('button.typeButton');
        result.first().simulate('click');
        
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  });

  it('has pop up confirmation', (done) => {
    let wrapper;
    wrapper = mount(<Types userType="admin"/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Types.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: types }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('button.typeButton');
        result.first().simulate('click');
        
        expect(wrapper.instance().state.show).toBe(true);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  });


  it('bring up tourtype', (done) => {
    let wrapper;
    wrapper = mount(<Types userType="admin"/>, { disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Types.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: types }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('.tourTypes');
  
        
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  });


  it('has addtour button', (done) => {
    let wrapper;
    wrapper = mount(<Types userType="admin"/> ,{ disableLifecycleMethods: true });
   
    const spyDidMount = jest.spyOn(Types.prototype, 'componentDidMount');


    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({ data: types }),
    }));


    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();

 
    didMount.then(() => {
   
      setImmediate(() => {
        wrapper.update();
        const result = wrapper.find('.addBtn');
  
        
        expect(result.length).toBeGreaterThan(0);

    
        spyDidMount.mockRestore();
        fetch.mockClear();

        done();
        wrapper.unmount();
      })
    })
  });
 
});

