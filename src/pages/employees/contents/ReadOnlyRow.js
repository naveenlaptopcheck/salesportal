import React from "react";
import { connect } from "react-redux";
import {
  DELETE_RECORD,
  EDIT_USER_OPEN,
  FILL_EDIT_FORM,
  OPEN_DELETE_DIALOGUE,
  OPEN_VIEW_USER_MODAL,
} from "../../../redux/actions";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import SwitchUser from "./SwitchUser";
import SwitchButton from "./SwitchButton";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

function ReadOnlyRow({
  record,
  handleOpenDeleteDialog,
  handleOpenViewModal,
  handleOpenEdit,
}) {
  const { name, id, status, phone, accessible_credit, net_salary } = record;
  console.log(record);
  return (
    <>
      <tr>
        <td
          onClick={handleOpenViewModal}
          style={{ cursor: "pointer", textTransform: "capitalize" }}
        >
          {name}
        </td>
        <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
          &#8377;{net_salary}
        </td>
        <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
          {phone}
        </td>

        <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
          &#8377;{accessible_credit === null ? "0" : accessible_credit}
        </td>
        <td>
          <SwitchButton status={status} id={id} net_salary={net_salary} />
        </td>
        <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
          <p
            style={{ textTransform: "capitalize" }}
            className={`${
              status.toLowerCase().trim() === "active"
                ? "active-status"
                : "inactive-status"
            }`}
          >
            <GoPrimitiveDot className="dot" />
            {status}
          </p>
        </td>
        <td className="action-btns">
          <button onClick={handleOpenDeleteDialog}>
            <MdDeleteOutline />
          </button>
          <button onClick={handleOpenEdit}>
            <MdOutlineModeEdit />
          </button>
        </td>
      </tr>
    </>
  );
}

//Redux
const mapStateToProps = (state) => {
  const { csvModalOpen } = state.recordReducer;
  return { csvModalOpen };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleOpenDeleteDialog: (e) => {
      e.preventDefault();
      const { record } = ownProps;
      const { id } = record;

      dispatch({ type: OPEN_DELETE_DIALOGUE, payload: { id } });
    },

    handleOpenViewModal: () => {
      const { record } = ownProps;
      const { id } = record;
      dispatch({ type: OPEN_VIEW_USER_MODAL, payload: { id } });
    },

    handleOpenEdit: () => {
      const { record } = ownProps;
      const { id } = record;

      dispatch({ type: EDIT_USER_OPEN, payload: { id } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyRow);
