import App from './App'
import { shallow, mount } from 'enzyme';
import React from 'react';

//Sidebar exists
test("App to exist", () => {
    expect(App).toMatchSnapshot();
})

