import React from "react";
import { shallow,mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import Transactions from "./Transactions";
import { Provider } from "react-redux";
import store from "../../redux/store";
describe("testing transactions page",()=>{
    let wrapper;
    let mockfunc;
    it(' should contain all button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Transactions fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(0)
        expect(b1.text()).toBe("ALL")
      

    })
    it(' should contain pending button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Transactions fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(1)
        expect(b1.text()).toBe("DEBIT")
      

    })
    it(' should contain complete button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Transactions fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(2)
        expect(b1.text()).toBe("CREDIT")
      

    })

    it(' should contain incomplete button ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Transactions fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('button').at(3)
        expect(b1.text()).toBe("REFUND")
      

    })
    it(' should contain table component ',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
            <Transactions fn={mockfunc} />
        </Provider>)
        let b1=wrapper.find('table')
        expect(b1.length).toBe(1)
      

    })
})