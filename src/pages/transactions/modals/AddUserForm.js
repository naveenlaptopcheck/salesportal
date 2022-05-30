import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { connect } from "react-redux";
//import * as Yup from "yup";
import { validate } from "./ValidateAddUser";
import {
  ADD_USER_ERROR,
  ADD_USER_FORM_CLOSE,
  ADD_USER_FORM_SUBMIT,
  FORM_LOCAL_LOADER_OPEN,
} from "../../../redux/actions";
import axios from "axios";

const customStyles = {
  content: {
    //display: "flex",
    //justifyContent: "center",
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

const AddUserForm = ({
  addUserOpen,
  handleAddUserClose,
  handleSubmit,
  handleFormLocalLoad,
}) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };
  //Formik

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      // status: "",
      // aadhar: "",
      // pan_card: "",
      net_salary: "",
      // gross_salary: "",
      account_holder_name: "",
      account_number: "",
      ifsc: "",
      // upi: "",
    },

    onSubmit: (values, { resetForm }) => {
      //console.log(values);
      handleSubmit(values, config);
      handleFormLocalLoad();
      resetForm({ values: "" });
    },
    validate,
  });

  // console.log("Errors", formik.errors);

  return (
    <Modal isOpen={addUserOpen} style={customStyles}>
      <h1 className="add-user-head">Add Employee Information</h1>
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
                  type="text"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="error-schema">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="error-schema">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="error-schema">{formik.errors.email}</div>
                ) : null}
              </div>
              {/* <div className="form-control">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                name="status"
                id="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              />
              {formik.errors.status && formik.touched.status ? (
                <div className="error-schema">{formik.errors.status}</div>
              ) : null}
            </div> */}
              {/* <div className="form-control">
              <label htmlFor="aadhar">Aadhar</label>
              <input
                type="text"
                name="aadhar"
                id="aadharNo"
                onChange={formik.handleChange}
                value={formik.values.aadhar}
              />
              {formik.errors.aadhar && formik.touched.aadhar ? (
                <div className="error-schema">{formik.errors.aadhar}</div>
              ) : null}
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
                type="text"
                name="pan_card"
                id="pan_card"
                onChange={formik.handleChange}
                value={formik.values.pan_card}
              />
              {formik.errors.pan_card && formik.touched.pan_card ? (
                <div className="error-schema">{formik.errors.pan_card}</div>
              ) : null}
            </div> */}

              {/* <div className="form-control">
              <label htmlFor="gross_salary">Gross Salary</label>
              <input
                type="text"
                name="gross_salary"
                id="gross_salary"
                onChange={formik.handleChange}
                value={formik.values.gross_salary}
              />
              {formik.errors.gross_salary && formik.touched.gross_salary ? (
                <div className="error-schema">{formik.errors.gross_salary}</div>
              ) : null}
            </div> */}
              <div className="form-control">
                <label htmlFor="account_holder_name">Account Holder Name</label>
                <input
                  type="text"
                  name="account_holder_name"
                  id="account_holder_name"
                  onChange={formik.handleChange}
                  value={formik.values.account_holder_name}
                />
                {formik.errors.account_holder_name &&
                formik.touched.account_holder_name ? (
                  <div className="error-schema">
                    {formik.errors.account_holder_name}
                  </div>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="account_number">Account Number</label>
                <input
                  type="text"
                  name="account_number"
                  id="account_number"
                  onChange={formik.handleChange}
                  value={formik.values.account_number}
                />
                {formik.errors.account_number &&
                formik.touched.account_number ? (
                  <div className="error-schema">
                    {formik.errors.account_number}
                  </div>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="ifsc">IFSC</label>
                <input
                  type="text"
                  name="ifsc"
                  id="ifsc"
                  onChange={formik.handleChange}
                  value={formik.values.ifsc}
                />
                {formik.errors.ifsc &&
                  formik.touched.ifsc ? (
                    <div className="error-schema">
                      {formik.errors.ifsc}
                    </div>
                ) : null}
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
                  type="text"
                  name="net_salary"
                  id="net_salary"
                  onChange={formik.handleChange}
                  value={formik.values.net_salary}
                />
                {formik.errors.net_salary && formik.touched.net_salary ? (
                  <div className="error-schema">{formik.errors.net_salary}</div>
                ) : null}
              </div>

              {/* <div className="form-control">
              <label htmlFor="upi">UPI</label>
              <input
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
              handleAddUserClose();
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
  const { addUserOpen } = state.recordReducer;
  return { addUserOpen };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddUserClose: () => {
      dispatch({ type: ADD_USER_FORM_CLOSE });
    },
    handleFormLocalLoad: () => {
      dispatch({ type: FORM_LOCAL_LOADER_OPEN });
    },
    handleSubmit: (values, config) => {
      console.log(config);
      axios
        .post(`${process.env.REACT_APP_URL}/console/employee`, values, config)
        .then((response) => {
          let { id } = response.data.employee;
          //console.log(id);

          axios
            .get(`${process.env.REACT_APP_URL}/console/employee/${id}`, config)
            .then((resp) => {
              return dispatch({
                type: ADD_USER_FORM_SUBMIT,
                payload: { data: resp.data },
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return dispatch({ type: ADD_USER_ERROR });
        });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);
