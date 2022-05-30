import React, { useReducer, useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { connect } from "react-redux";
import { Button } from "@mui/material";
import {
  OPEN_DROP_NOTIF,
  OPEN_PROFILE_DROP,
  OPEN_WHATS_NEW,
  OPEN_PAYDAY_CHANGE_DIALOGUE,
  TEMP_UPDATE_PAYDAY_VALUE,
} from "../redux/actions";
import { Link, useLocation } from "react-router-dom";
import NavProfileModal from "./NavProfileModal";
 import WhatsNew from "./WhatsNew";
import DropNotifications from "./DropNotifications";
import {Navigate} from 'react-router-dom'
function Navbar({
  handleProfileDrop,
  handleWhtsNew,
  handleOpenNotifDrop,
  apiDash,
  apiProfile,
  handleOpenPaydayDialog,
  handleTempPaydayValueChange,
  paydayValue,
}) {
  let size = Object.keys(apiDash).length;
  let username = localStorage.getItem("name");
  let location = useLocation();
  let pathname = location.pathname.substring(1);
  let pathvar = pathname.charAt(0).toUpperCase() + pathname.substring(1);
  let user="John Doe "
  const log=()=>{
    localStorage.removeItem("token")
    window.location.replace("/")
  }



  return (
    <>
      {size !== 0 && <WhatsNew />}
      <NavProfileModal />
      <DropNotifications />
      <div className="navbar">
      <h1 className="logo">
          <div className="page-link">
           FINSIRE
          </div>
        </h1>
        <div className="page-link1">
        <h1  onClick={()=>{
        
          window.location.replace("/employees")
        }} style={{ borderBottom:pathname==="employees"?"2px solid green":"",
                                             paddingBottom:"2px",cursor:"grab"}}>
          Employees
        </h1>
        <h1 onClick={()=>{
                    window.location.replace("/transactions")

        }} style={{ borderBottom:pathname==="transactions"?"2px solid green":"",
                                             paddingBottom:"2px",cursor:"grab"}} >
         Transactions
        </h1>
        
        </div>
       {pathname==="transactions"&& 
       <div style={{ color: "#00394d",fontSize:"7px",position:"absolute",right:"120px"}}>
       <h1>Welcome , {user}</h1>
        </div>}
        <h1 className="log-out" onClick={(e)=>log(e)}>
          LOGOUT
        </h1>
        {/* <div className="nav-icons">
          <p>{username}</p>
          <AccountCircleOutlinedIcon className="nav-icon" onClick={handleProfileDrop} />
        </div> */}
      </div>
    </>
  );
}

//Redux

const mapStateToProps = (state) => {
 
  const { apiDash, apiProfile, paydayValue } = state.recordReducer;

  return { apiDash, apiProfile, paydayValue };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleTempPaydayValueChange: (value) => {
      dispatch({ type: TEMP_UPDATE_PAYDAY_VALUE, payload: { data: value } });
    },
    handleProfileDrop: () => {
      dispatch({ type: OPEN_PROFILE_DROP });
    },
    handleOpenNotifDrop: () => {
      dispatch({ type: OPEN_DROP_NOTIF });
    },
    handleWhtsNew: () => {
      dispatch({ type: OPEN_WHATS_NEW });
    },
    handleOpenPaydayDialog: () => {
      // dispatch({ type: OPEN_PAYDAY_CHANGE_DIALOGUE, payload: { id } });
      dispatch({ type: OPEN_PAYDAY_CHANGE_DIALOGUE });
  },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
