import React from "react";
import { mount,shallow } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Employees from "./Employees";
import store from  "../../redux/store"
import { act } from 'react-dom/test-utils';




describe(" testing employees page", () => {
    let wrapper;
    let mockfunc;
    it(' should contain all button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Employees fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(0)
        expect(b1.text()).toBe("ALL")
      

    })
    it(' should contain pending button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Employees fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(1)
        expect(b1.text()).toBe("PENDING")
      

    })
    it(' should contain complete button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Employees fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(2)
        expect(b1.text()).toBe("COMPLETE")
      

    })

    it(' should contain incomplete button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Employees fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(3)
        expect(b1.text()).toBe("INCOMPLETE")
      

    })
    it(' should contain table component ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Employees fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('table')
        expect(b1.length).toBe(1)
      

    })
    
 
})