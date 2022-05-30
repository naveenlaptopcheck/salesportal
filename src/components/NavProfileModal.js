import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CLOSE_PROFILE_DROP } from "../redux/actions";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiListSettingsFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { useMediaQuery } from 'react-responsive'

const customStyles1 = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "13rem",
    height: "14rem",
    background: "#00394d",
    boxShadow: "-2px 3px 2px rgba(0,0,0,0.25)",
    top: "12rem",
    left: "91.5%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
};

const customStyles2 = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "13rem",
    height: "14rem",
    background: "#00394d",
    boxShadow: "-2px 3px 2px rgba(0,0,0,0.25)",
    top: "12rem",
    left: "83.5%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
};


const NavProfileModal = ({ profileDropOpen, handleCloseUserDrop }) => {

  let navigate = useNavigate();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1600px)' })
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1600px)' })

  return (
    <div className="nav-user-drop">
      {isSmallScreen && <Modal
        isOpen={profileDropOpen}
        style={customStyles1}
        onRequestClose={handleCloseUserDrop}
        // portalClassName="nav-profile-modal"
      >
        <div className="drop-items">
          <ul>
            <li>
              <Link
                className="drop-link"
                to="/settings"
                onClick={handleCloseUserDrop}
              >
                <RiListSettingsFill className="drop-icon-profile" />
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link
                className="drop-link"
                to="/profile"
                onClick={handleCloseUserDrop}
              >
                <FaUserCircle className="drop-icon-profile" />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  navigate("/");
                  handleCloseUserDrop();
                }}
              >
                <IoLogOut className="drop-icon-profile" />
                <p>Sign-Out</p>
              </button>
            </li>
          </ul>
        </div>
      </Modal>}
      {isBigScreen && <Modal
        isOpen={profileDropOpen}
        style={customStyles2}
        onRequestClose={handleCloseUserDrop}
        // portalClassName="nav-profile-modal"
      >
        <div className="drop-items">
          <ul>
            <li>
              <Link
                className="drop-link"
                to="/settings"
                onClick={handleCloseUserDrop}
              >
                <RiListSettingsFill className="drop-icon-profile" />
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link
                className="drop-link"
                to="/profile"
                onClick={handleCloseUserDrop}
              >
                <FaUserCircle className="drop-icon-profile" />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  navigate("/");
                  handleCloseUserDrop();
                }}
              >
                <IoLogOut className="drop-icon-profile" />
                <p>Sign-Out</p>
              </button>
            </li>
          </ul>
        </div>
      </Modal>}
      </div>
  );
};

//Redux
const mapStateToProps = (state) => {

  return {  };
};
// const mapStateToProps = (state) => {
//   const { profileDropOpen } = state.reducer;
//   return { profileDropOpen };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseUserDrop: () => {
      dispatch({ type: CLOSE_PROFILE_DROP });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavProfileModal);
