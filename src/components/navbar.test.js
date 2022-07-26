import React from "react";
import { mount,shallow } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import store from  "../redux/store"
import { act } from 'react-dom/test-utils';




describe(" testing employees page", () => {
    let wrapper;
    let mockfunc;
    it(' should contain employee tag',()=>{
        wrapper=mount(<Provider store={store}>
               <Router>
                <Navbar />
               </Router>
        </Provider>)
        let emp=wrapper.find("h1").at(1).text()
        expect(emp).toBe("Employees")

    })
    it(' should contain transactions tag',()=>{
        wrapper=mount(<Provider store={store}>
               <Router>
                <Navbar />
               </Router>
        </Provider>)
        let emp=wrapper.find("h1").at(2).text()
        expect(emp).toBe("Transactions")

    })
    it(' should contain logout button',()=>{
        wrapper=mount(<Provider store={store}>
               <Router>
                <Navbar />
               </Router>
        </Provider>)
        let emp=wrapper.find("h1").at(3).text()
        expect(emp).toBe("LOGOUT")

    })
    it(' should trigger logout function after clicking',()=>{
        mockfunc=jest.fn()
        wrapper=mount(<Provider store={store}>
               <Router>
                <Navbar fn={mockfunc} />
               </Router>
        </Provider>)
        let emp=wrapper.find("h1").at(3)
        emp.simulate('click')
        let mockcalls=mockfunc.mock.calls.length
        expect(mockcalls).toBe(1)

    })
 
})