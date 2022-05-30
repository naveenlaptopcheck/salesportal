import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { CLOSE_DROP_NOTIF } from "../redux/actions";
import { IoClose } from "react-icons/io5";

const customStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30rem",
    height: "40rem",
    transsition: "400ms",
    background: "#dfdfdf",
    boxShadow: "-2px 2px 10px rgba(0,0,0,0.25)",
    top: "25rem",
    left: "85%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    borderRadius: "2px",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
};

const DropNotifications = ({ handleCloseDropNotif }) => {
  return (
    <Modal
     
      style={customStyles}
    
    >
      <div className="drop-notific">
        <div className="drop-notif-logo">
          <h2>Notifications</h2>
        </div>
        <div className="all-notif-wrap">
          <div className="single-notif-wrap">
            <ul className="drop-notif-single">
              <li>
                <div className="notif-drop-style">
                  <div className="green-dot"></div>
                  <p>Notification 01</p>
                </div>

                <div className="notif-upd">
                  <li>Update 01</li>
                  <li>Update 02</li>
                </div>
              </li>
            </ul>
            <button>
              <IoClose />
            </button>
          </div>
          <div className="single-notif-wrap">
            <ul className="drop-notif-single">
              <li>
                <div className="notif-drop-style">
                  <div className="green-dot"></div>
                  <p>Notification 01</p>
                </div>

                <div className="notif-upd">
                  <li>Update 01</li>
                  <li>Update 02</li>
                </div>
              </li>
            </ul>
            <button>
              <IoClose />
            </button>
          </div>
          <div className="single-notif-wrap">
            <ul className="drop-notif-single">
              <li>
                <div className="notif-drop-style">
                  <div className="green-dot"></div>
                  <p>Notification 01</p>
                </div>

                <div className="notif-upd">
                  <li>Update 01</li>
                  <li>Update 02</li>
                </div>
              </li>
            </ul>
            <button>
              <IoClose />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

//Redux

const mapStateToProps = (state) => {
  const { dropNotifOpen } = state.reducer;
  return { dropNotifOpen };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseDropNotif: () => {
      dispatch({ type: CLOSE_DROP_NOTIF });
    },
  };
};

export default DropNotifications;
