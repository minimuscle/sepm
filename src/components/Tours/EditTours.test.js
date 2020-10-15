
import React from 'react';
import EditTours from './EditTours.js';
import { mount } from  "enzyme";
import Enzyme from  "enzyme";
import Adapter from  "enzyme-adapter-react-16";
import locations from '../../api/json/locations.json';
import tpyes from '../../api/json/types.json';

Enzyme.configure({adapter: new Adapter() });


describe('<EditTours />', () => {

    it('bring up tourtype', (done) => {
        let wrapper;
        wrapper = mount(<EditTours />, { disableLifecycleMethods: true });
       
        const spyDidMount = jest.spyOn(EditTours.prototype, 'componentDidMount');
    
    
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 200,
          json: () => ({ data: locations,tpyes }),
        }));
    
    
        const didMount = wrapper.instance().componentDidMount();
        expect(spyDidMount).toHaveBeenCalled();
    
     
        didMount.then(() => {
       
          setImmediate(() => {
            wrapper.update();
            const result = wrapper.find('.locationform');
      
            
            expect(result.length).toBeGreaterThan(0);
    
        
            spyDidMount.mockRestore();
            fetch.mockClear();
    
            done();
            wrapper.unmount();
          })
        })
      });
    
      });