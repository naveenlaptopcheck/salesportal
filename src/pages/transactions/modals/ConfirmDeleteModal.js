import axios from "axios";
import React from "react";

import Modal from "react-modal";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CLOSE_DELETE_DIALOGUE,
  DELETE_OPEN_LOCAL_LOADER,
  DELETE_RECORD,
} from "../../../redux/actions";

const customStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "360px",
    height: "160px",
    // background: "lightBlue",
    boxShadow: "0px 10px 5px rgba(0,0,0,0.25)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

const ConfirmDeleteModal = ({
  deleteDialogOpen,
  handleCloseDeleteDialog,
  handleDeleteUser,
  deleteId,
  handleDeleteOpenLocalLoader,
}) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };
  return (
    <Modal isOpen={deleteDialogOpen} style={customStyles}>
      <div className="show-delete">
        <div className="delete-text">
          <p>
            Are you sure you want
            <br /> to delete?
          </p>
        </div>
        <div className="user-delete-btns">
          <button
            onClick={(e) => {
              handleDeleteUser(e, deleteId, config);
              handleDeleteOpenLocalLoader();
            }}
          >
            Yes
          </button>
          <button onClick={handleCloseDeleteDialog}>No</button>
        </div>
      </div>
    </Modal>
  );
};

//Redux
const mapStateToProps = (state) => {
  const { deleteDialogOpen, deleteId } = state.recordReducer;
  return { deleteDialogOpen, deleteId };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCloseDeleteDialog: () => {
      //e.preventDefault();
      dispatch({ type: CLOSE_DELETE_DIALOGUE });
    },
    handleDeleteOpenLocalLoader: () => {
      dispatch({ type: DELETE_OPEN_LOCAL_LOADER });
    },
    handleDeleteUser: (e, deleteId, config) => {
      e.preventDefault();
      axios
        .delete(
          `${process.env.REACT_APP_URL}/console/employee/${deleteId}`,
          config
        )
        .then((response) => {
          return dispatch({ type: DELETE_RECORD, payload: deleteId });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteModal);
