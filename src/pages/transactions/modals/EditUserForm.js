import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import {
  EDIT_LOCAL_LOADER,
  EDIT_USER_CLOSE,
  EDIT_USER_FORM_SUBMIT,
  FORM_LOCAL_LOADER_OPEN,
} from "../../../redux/actions";

const customStyles = {
  content: {
    width: "92rem",
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

const EditUserForm = ({
  editUserOpen,
  editUserData,
  handleEditSubmit,
  handleEditClose,
  handleFormLocalLoad,
}) => {
  const {
    id,
    status,
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
  } = editUserData;
  // console.log(name);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };
  //Formik
  const formik = useFormik({
    initialValues: {
      id: id,
      name: name,
      phone: phone,
      email: email,
      // status: status,
      // aadhar: aadhar,
      // pan_card: pan_card,
      net_salary: net_salary,
      // gross_salary: 45212,
      account_holder_name: account_holder_name,
      account_number: account_number,
      ifsc: ifsc,
      // upi: upi,
    },
    onSubmit: (values, { resetForm }) => {
      //console.log("Submit val", values);
      handleFormLocalLoad();
      handleEditSubmit(values, config, id);

      resetForm({ values: "" });
    },
    enableReinitialize: true,
  });

  //console.log(formik.values);
  return (
    <Modal isOpen={editUserOpen} style={customStyles}>
      <h1 className="add-user-head">
        <>Edit Employee Details</>
      </h1>
      <div className="add-underline"></div>
      <form className="add-form" onSubmit={formik.handleSubmit}>
        <div className="add-user-form">
          <div className="first-form-col">
            <div className="add-user-category">
              <h1>Personnel Information</h1>
              <p>
                This information is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="form-control-wrap">
              <div className="form-control">
                <label htmlFor="name">Employee Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div className="form-control">
                <label htmlFor="phone">Phone</label>
                <input
                  required
                  type="number"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </div>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              {/* <div className="form-control">
              <label htmlFor="status">Status</label>
              <input
                required
                type="text"
                name="status"
                id="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              />
            </div> */}
              {/* <div className="form-control">
              <label htmlFor="aadhar">Aadhar</label>
              <input
                required
                type="text"
                name="aadhar"
                id="aadhar"
                onChange={formik.handleChange}
                value={formik.values.aadhar}
              />
            </div> */}
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
            <div className="form-control-wrap">
              {/* <div className="form-control">
              <label htmlFor="pan_card">PAN</label>
              <input
                required
                type="text"
                name="pan_card"
                id="pan_card"
                onChange={formik.handleChange}
                value={formik.values.pan_card}
              />
            </div> */}

              {/* <div className="form-control">
              <label htmlFor="gross_salary">Gross Salary</label>
              <input
                required
                type="number"
                name="gross_salary"
                id="gross_salary"
                onChange={formik.handleChange}
                value={formik.values.gross_salary}
              />
            </div> */}
              <div className="form-control">
                <label htmlFor="account_holder_name">Account Holder Name</label>
                <input
                  required
                  type="text"
                  name="account_holder_name"
                  id="account_holder_name"
                  onChange={formik.handleChange}
                  value={formik.values.account_holder_name}
                />
              </div>
              <div className="form-control">
                <label htmlFor="account_number">Account Number</label>
                <input
                  required
                  type="number"
                  name="account_number"
                  id="account_number"
                  onChange={formik.handleChange}
                  value={formik.values.account_number}
                />
              </div>
              <div className="form-control">
                <label htmlFor="ifsc">IFSC</label>
                <input
                  required
                  type="text"
                  name="ifsc"
                  id="ifsc"
                  onChange={formik.handleChange}
                  value={formik.values.ifsc}
                />
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
            <div className="form-control-wrap">
              <div className="form-control">
                <label htmlFor="net_salary">Net Salary</label>
                <input
                  required
                  type="number"
                  name="net_salary"
                  id="net_salary"
                  onChange={formik.handleChange}
                  value={formik.values.net_salary}
                />
              </div>

              {/* <div className="form-control">
              <label htmlFor="upi">UPI</label>
              <input
                required
                type="text"
                name="upi"
                id="upi"
                onChange={formik.handleChange}
                value={formik.values.upi}
              />
            </div> */}
            </div>
          </div>
        </div>
        <div className="add-underline"></div>
        <div className="add-newuser-btns">
          <button
            className="cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              handleEditClose();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            // onClick={(e) => {
            //   e.preventDefault();
            // }}
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};
//Redux

const mapStateToProps = (state) => {
  const { editUserOpen, editUserData } = state.recordReducer;
  return { editUserOpen, editUserData };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormLocalLoad: () => {
      dispatch({ type: EDIT_LOCAL_LOADER });
    },
    handleEditSubmit: (values, config, id) => {
      axios
        .put(
          `${process.env.REACT_APP_URL}/console/employee/${id}`,
          values,
          config
        )
        .then((response) => {
          //console.log(response.data);
          return dispatch({
            type: EDIT_USER_FORM_SUBMIT,
            payload: { data: response.data.employee },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEditClose: () => {
      dispatch({ type: EDIT_USER_CLOSE });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
