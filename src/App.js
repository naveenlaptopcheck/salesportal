import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./styles/app.scss";
import { DATA_FETCHED, PAGE_LOAD_START } from "./redux/actions";

import Navbar from "./components/Navbar";
import LoadingPage from "./components/LoadingPage";


//import Dashboard from "./pages/dashboard/Dashboard";
// import Records from "./pages/records/Records";
import Employees from './pages/employees/Employees';
import Transactions from './pages/transactions/Transactions'
// import Settings from "./pages/Settings/Settings";
import LoginPage from "./pages/LoginPage";
import { CurrencyExchange } from "@mui/icons-material";
// import Profile from "./pages/Profile/Profile";
// import SalesCalcPage from "./pages/SalesCalculator/SalesCalcPage";
// import SecondPage from "./pages/SignUp/SecondPage";
// import FirstPage from "./pages/SignUp/FirstPage";
// import ConfirmSignUpPage from "./pages/SignUp/ConfirmSignUpPage";
// import EmployerResult from "./pages/SalesCalculator/Contents/EmployerResult";
// import EmployeeResult from "./pages/SalesCalculator/Contents/EmployeeResult";
// import Workspace from "./pages/workspace/Workspace";

function App({ isLoading, handleFetch, msgModalOpen }) {
  // const token = localStorage.getItem("token");
  const token =localStorage.getItem("token") ;
  const config = {
    headers: { Authorization: `${token}` },
  };
  let location = useLocation();
  useEffect(() => {
    token !== null && handleFetch(config);
  }, [handleFetch]);
  if (isLoading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  } else {
    //console.log(loading);
    //let token = localStorage.getItem("token");

    let hideNavArr = [
      "/dashboard",
      "/workspace",
      "/employees",
      "/settings",
      "/profile",
      "/transactions"
    ];
    let currentPath = location.pathname;
  
    let showPath = hideNavArr.find((path) => currentPath === path);
    //console.log(hidePath);

    return (
      <>
       {showPath && <Navbar />}
      
        <Routes>
          {/* <Route
            path="/"
            element={
              token === null ? (
                <LoginPage />
              ) : (
                <Navigate replace to="/dashboard" />
              )
            }
          /> */}

          <Route exact path="/" element={<LoginPage />} />

          {/* <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/password_mail_sent" element={<PasswordMailSent />} />
          <Route path="/reset_password/:id" element={<ResetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} /> */}
          {/* <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/employeronboard" element={<EmployerOnboard />} /> */}
          {/* <Route path="/salescalculator" element={<SalesCalcPage />} />
          <Route path="employer_result" element={<EmployerResult />} />
          <Route path="employee_result" element={<EmployeeResult />} />
          <Route path="/employer_create" element={<FirstPage />} />
          <Route path="/employer_create/:id/*" element={<SecondPage />} />
          <Route path="/signup_confirm" element={<ConfirmSignUpPage />} /> */}

          {/* <Route
            exact
            path="/dashboard"
            element={
              token !== null ? <Dashboard /> : <Navigate replace to="/" />
            }
          /> */}

          {/* <Route
            path="/records"
            element={token !== null ? <Records /> : <Navigate replace to="/" />}
          /> */}
          {/* <Route
            path="/workspace"
            element={token !== null ? <Workspace /> : <Navigate replace to="/" />}
          /> */}
          <Route
            path="/employees"
            element={token !== null ? <Employees /> : <Navigate replace to="/" />}
          />
          <Route path="/transactions"  element={token !== null ? <Transactions/> : <Navigate replace to="/" />}>

          </Route>
          {/* <Route
            path="/refer"
            element={token !== null ? <Refer /> : <Navigate replace to="/" />}
          /> */}
          {/* <Route
            path="/settings"
            element={
              token !== null ? <Settings /> : <Navigate replace to="/" />
            }
          /> */}
          {/* <Route
            path="/profile"
            element={token !== null ? <Profile /> : <Navigate replace to="/" />}
          /> */}
          <Route
            path="*"
            element={
              <>
                <h1>Path not found</h1>
              </>
            }
          />
        </Routes>
      </>
    );
  }
}

const mapStateToProps = (state) => {

  const { isLoading, msgModalOpen } = state.recordReducer;
  
  

  return { isLoading, msgModalOpen };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetch: (config) => {
      dispatch({ type: PAGE_LOAD_START });
   
      let url1 = `${process.env.REACT_APP_URL}/sales/employee`;
      // let url2 = `${process.env.REACT_APP_URL}/console/dashboard`;
      // let url3 = `${process.env.REACT_APP_URL}/console/todo?checked=false`;
      // let url4 = `${process.env.REACT_APP_URL}/console/issue?status=initiated`;
      // let url5 = `${process.env.REACT_APP_URL}/console/record`;
      // let url6 = `${process.env.REACT_APP_URL}/console/employer`;
      // let url7 = `${process.env.REACT_APP_URL}/console/alert`;
      // let url8 = `${process.env.REACT_APP_URL}/console/whats_new`;
      // let url9 = `${process.env.REACT_APP_URL}/console/credit_given_graph?duration=weekly`;
      // let url10 = `${process.env.REACT_APP_URL}/console/usage_graph?duration=weekly`;
      // let url11 = `${process.env.REACT_APP_URL}/console/defaulter_list`;

      const promise1 = axios.get(url1, config);
      // const promise2 = axios.get(url2, config);
      // const promise3 = axios.get(url3, config);
      // const promise4 = axios.get(url4, config);
      // const promise5 = axios.get(url5, config);
      // const promise6 = axios.get(url6, config);
      // const promise7 = axios.get(url7, config);
      // const promise8 = axios.get(url8, config);
      // const promise9 = axios.get(url9, config);
      // const promise10 = axios.get(url10, config);
      // const promise11 = axios.get(url11, config);
      Promise.all([
        promise1,
        // promise2,
        // promise3,
        // promise4,
        // promise5,
        // promise6,
        // promise7,
        // promise8,
        // promise9,
        // promise10,
        // promise11,
      ]).then((response) => {
        // console.log('logging response in app page');
        // console.log(response);
      
        return dispatch({
          type: DATA_FETCHED,
          payload: {
            data: {
              dataRec: response[0].data.employee,
              dataRecTotalPages: response[0].data.total_pages,
              // dataDash: response[1].data,
              // dataTodo: response[2].data.todos,
              // dataTodoTotalPages: response[2].data.total_pages,
              // dataTodoTotalEntries: response[2].data.total_entries,
              // dataIssues: response[3].data.issues,
              // dataIssuesTotalPages: response[3].data.total_pages,
              // dataIssuesTotalEntries: response[3].data.total_entries,
              // dataDefaulter: response[4].data,
              // dataProfile: response[5].data,
              // dataAlert: response[6].data,
              // dataWhatsnew: response[7].data,
              // dataCreditGivenGraph: response[8].data,
              // dataUsageGraph: response[9].data,
              // dataDefaulterList: response[10].data,
            },
          },
        });
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
