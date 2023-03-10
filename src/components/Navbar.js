import React, { useReducer, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { connect } from "react-redux";
import "./nav.css";
import { Avatar, Button, Menu } from "@mui/material";
import {
  OPEN_DROP_NOTIF,
  OPEN_PROFILE_DROP,
  OPEN_WHATS_NEW,
  OPEN_PAYDAY_CHANGE_DIALOGUE,
  TEMP_UPDATE_PAYDAY_VALUE,
} from "../redux/actions";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useLocation } from "react-router-dom";
import NavProfileModal from "./NavProfileModal";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatsNew from "./WhatsNew";
import DeleteIcon from "@mui/icons-material/Delete";
import DropNotifications from "./DropNotifications";
import { Navigate } from "react-router-dom";
import Hamb1 from "./hamb1";
import Hamb from "./hamb";
import { width } from "@mui/system";
function Navbar({
  handleProfileDrop,
  handleWhtsNew,
  handleOpenNotifDrop,
  apiDash,
  apiProfile,
  handleOpenPaydayDialog,
  handleTempPaydayValueChange,
  paydayValue,
  fn,
}) {
  let size = Object.keys(apiDash).length;
  let username = localStorage.getItem("name");
  let location = useLocation();
  var [n, setn] = useState(false);
  var [s1, sets1] = useState([1, 2, 3, 4, 5]);
  var del1 = () => {
    var z = s1[s1.length - 1];
    sets1(s1.filter((x) => x != z));
  };
  let pathname = location.pathname.substring(1);
  let pathvar = pathname.charAt(0).toUpperCase() + pathname.substring(1);
  const log = () => {
    if ((fn !== undefined) & (fn !== null)) {
      fn();
    }
    localStorage.removeItem("token");
    window.location.replace("/");
  };
  let [h, seth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    seth(window.innerWidth);
  });

  if (h > 1000) {
    return (
      <>
        {size !== 0 && <WhatsNew />}
        {/* <NavProfileModal />
      <DropNotifications /> */}
        <div className="navbar">
          <h1 className="logo">
            <div className="page-link">FINSIRE</div>
          </h1>
          <div className="page-link1">
            <h1
              onClick={() => {
                window.location.replace("/employees");
              }}
              style={{
                borderBottom: pathname === "employees" ? "2px solid green" : "",
                paddingBottom: "2px",
                cursor: "pointer",
              }}
            >
              Employees
            </h1>
            <h1
              onClick={() => {
                window.location.replace("/transactions");
              }}
              style={{
                borderBottom:
                  pathname === "transactions" ? "2px solid green" : "",
                paddingBottom: "2px",
                cursor: "pointer",
              }}
            >
              Transactions
            </h1>
          </div>
          {/* <div id="noti" className="notifications">
            {n === true && (
              <Menu open={n} anchorEl={document.getElementById("noti")}>
                <div
                  style={{
                    width: "400px",
                    minHeight: "250px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "20px",
                      borderBottom: "1px solid lightgray",
                    }}
                  >
                    <h1>Notifications</h1>
                    <CancelIcon
                      fontSize="large"
                      sx={{ color: "Highlight" }}
                      onClick={() => setn(false)}
                    ></CancelIcon>
                  </div>

                  {s1.map(() => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "20px",
                        gap: "20px",
                        alignItems: "center",
                        borderBottom: "1px solid lightgray",
                      }}
                      className="notifi"
                    >
                      <div>
                        <Avatar sx={{ backgroundColor: "lightblue" }}>s</Avatar>
                      </div>
                      <div>
                        <h2>test notification</h2>
                        <h2>
                          this is a test notification for tesing purpose ??? ? ?
                        </h2>
                      </div>
                      <div style={{ cursor: "pointer" }}>
                        <DeleteIcon
                          fontSize="large"
                          sx={{ color: "red" }}
                          onClick={del1}
                        ></DeleteIcon>
                      </div>
                    </div>
                  ))}
                  {s1.length === 0 && (
                    <div
                      className="rgt12"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                      }}
                    >
                      <HourglassEmptyIcon
                        sx={{ fontSize: "50px" }}
                      ></HourglassEmptyIcon>
                      <h2>Empty</h2>
                    </div>
                  )}
                </div>
              </Menu>
            )}
            <NotificationsIcon
              onClick={() => setn(!n)}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></NotificationsIcon>
          </div> */}
          <h1 className="log-out" onClick={(e) => log(e)}>
            LOGOUT
          </h1>

          {/* <div className="nav-icons">
          <p>{username}</p>
          <AccountCircleOutlinedIcon className="nav-icon" onClick={handleProfileDrop} />
        </div> */}
        </div>
      </>
    );
  } else {
    return <>{pathname === "transactions" ? <Hamb1></Hamb1> : <Hamb></Hamb>}</>;
  }
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
