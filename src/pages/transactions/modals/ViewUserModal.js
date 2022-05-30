import React from "react";
import Modal from "react-modal";
import { connect, useDispatch } from "react-redux";
import { CLOSE_VIEW_USER_MODAL, EDIT_USER_OPEN } from "../../../redux/actions";

const customStyles = {
  content: {
    width: "94rem",
    height: "65rem",
    boxShadow: "4px 10px 8px rgba(0,0,0,0.2)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

const ViewUserModal = ({
  viewUserOpen,
  viewUserData,
  handleCloseViewModal,
}) => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    phone,
    aadhar,
    pan_card,
    net_salary,
    accessible_credit,
    account_holder_name,
    account_number,
    ifsc,
    upi,
    email,
  } = viewUserData;
  return (
    <Modal
      isOpen={viewUserOpen}
      // overlayClassName="Overlay"
      style={customStyles}
    >
      <h1 className="view-user-head">Employee Information</h1>
      <div className="view-underline"></div>
      <div className="view-form">
        <div className="view-user-form">
          <div className="first-form-col">
            <div className="add-user-category">
              <h1>Personnel Information</h1>
              <p>
                This information is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap">
              <div className="view-control">
                <h3>Employee Name</h3>
                <p>{name}</p>
              </div>
              <div className="view-control">
                <h3>Phone</h3>
                <p>{phone}</p>
              </div>
              <div className="view-control">
                <h3>Email</h3>
                <p>{email}</p>
              </div>
            </div>
          </div>
          <div className="add-underline"></div>
          <div className="first-form-col">
            <div className="add-user-category">
              <h1>Bank Details</h1>
              <p>
                This information is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap">
              <div className="view-control">
                <h3>Account Holder Name</h3>
                <p>{account_holder_name}</p>
              </div>
              <div className="view-control">
                <h3>Account Number</h3>
                <p>{account_number}</p>
              </div>
              <div className="view-control">
                <h3>IFSC</h3>
                <p>{ifsc}</p>
              </div>
            </div>
          </div>
          <div className="add-underline"></div>
          <div className="first-form-col">
            <div className="add-user-category">
              <h1>Salary Information</h1>
              <p>
                This information is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap">
              <div className="view-control">
                <h3>Accessible Credit</h3>
                <p> &#x20B9; {accessible_credit}</p>
              </div>
              <div className="view-control">
                <h3>Net Salary</h3>
                <p> &#x20B9; {net_salary}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="add-underline"></div>
        <div className="add-newuser-btns">
          <button
            className="cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              handleCloseViewModal();
            }}
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              dispatch({ type: EDIT_USER_OPEN, payload: { id } });
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
};

//Redux
const mapStateToProps = (state) => {
  const { viewUserOpen, viewUserData } = state.recordReducer;
  return { viewUserOpen, viewUserData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseViewModal: () => {
      dispatch({ type: CLOSE_VIEW_USER_MODAL });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserModal);
