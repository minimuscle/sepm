import React from 'react';
import EditLocations from './EditLocations.js';
import { mount } from  "enzyme";
import Enzyme from  "enzyme";
import Adapter from  "enzyme-adapter-react-16";
import locations from '../../api/json/locations.json';


Enzyme.configure({adapter: new Adapter() });




describe('<EditLocations />',  () => {


    it('has save location button', () => {
     
        let wrapper = mount(< EditLocations  />);
     
            const result = wrapper.find('button.saveLocation');
       
            expect(result.length).toBeGreaterThan(0);
    
       
         
          })
        })
  
        it('has click funtion on save location button', () => {
     
            let wrapper = mount(< EditLocations  />);
         
                const result = wrapper.find('button.saveLocation');
           
                result.simulate('click');
        
                expect(result.length).toBeGreaterThan(0);
        
        
           
             
      })
      
     