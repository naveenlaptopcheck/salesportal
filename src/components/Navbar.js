import React, { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { connect } from "react-redux";
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



  return (
    <>
      {size !== 0 && <WhatsNew />}
      <NavProfileModal />
      <DropNotifications />
      <div className="navbar">
        <h1 className="logo">
          <div className="page-link">
            {pathvar}
          </div>
        </h1>
        <div className="nav-icons">
          <p>{username}</p>
          <AccountCircleOutlinedIcon className="nav-icon" onClick={handleProfileDrop} />
        </div>
      </div>
    </>
  );
}

//Redux

const mapStateToProps = (state) => {
  const { whtsNewOpen } = state.reducer;
  const { apiDash, apiProfile, paydayValue } = state.recordReducer;
  return { whtsNewOpen, apiDash, apiProfile, paydayValue };
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
