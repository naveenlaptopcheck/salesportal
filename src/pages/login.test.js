import React from "react";
import { mount,shallow } from "enzyme";
import { Provider } from "react-redux";
import LoginPage from "./LoginPage"
import { BrowserRouter as Router } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import store from  "../redux/store"
import { act } from 'react-dom/test-utils';
import { compileString } from "sass";
import storage from "redux-persist/lib/storage";
import {
    LOGIN_ERROR,
  } from "../redux/actions";



describe("Testing Login Page", () => {
    
    let wrapper;
    let mockfunc;
    
    it('should contain an email input tag', () => {
        wrapper =mount(<Provider store={store}>
                <Router>
           
                <LoginPage />
                </Router>
        </Provider>);
        
        let component=wrapper.find('input#email')
        expect(component.length).toBe(1);
    });
    
    it('should contain a password input tag', () => {
        wrapper = mount(
           <Provider store={store}>
               <Router>
                <LoginPage />
                </Router>
                </Provider>
    );
        let component=wrapper.find('input#password')
        expect(component.length).toBe(1);
    });

    it('should contain a disabled submit button', () => {
        wrapper = mount(<Provider store={store}>
                <Router>
                <LoginPage />
                </Router>
                </Provider>);

        let component=wrapper.find('button[disabled=true]')
        expect(component.length).toBe(1);
    });
    it('should contain a p tag for invalid cred',async () => {
        
    
        
        store.dispatch({ type: LOGIN_ERROR })
        wrapper = mount(<Provider store={store}>
            <Router>
            <LoginPage  test={true}  />
            </Router>
            </Provider>)
         let p=wrapper.find('p').exists()

        expect(p).toBe(true)
       
        
      

       
    });
})