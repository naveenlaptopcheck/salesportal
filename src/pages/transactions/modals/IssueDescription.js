import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { ISSUE_CLOSE } from "../../../redux/actions";

const customStyles = {
  content: {
    width: "43rem",
    minHeight: "220px",
    //background: "lightBlue",
    overflowY: "hidden",
    boxShadow: "0px 10px 8px rgba(0,0,0,0.2)",
    top: "35%",
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

const IssueDescription = ({
  issueDescContent,
  issueDescOpen,
  handleIssueClose,
}) => {
  console.log(issueDescOpen);
  let { content, created_at, name, status } = issueDescContent;
  return (
    <Modal isOpen={issueDescOpen} style={customStyles}>
      <>
        <div className="todo-desc-wrap">
          <div className="desc-details">
            <h3>Details</h3>
            {/* {checked === true ? (
              <p className="completed">Completed</p>
            ) : (
              <p className="in-prog">In progress</p>
            )} */}
          </div>
          <button onClick={handleIssueClose} className="close-desc-btn">
            Close
          </button>
          <div className="underline-desc"></div>
          <div className="desc-contents">
            <div className="desc-control-one">
              <p>Name</p>
              <p>Status</p>
              <p>Dated at</p>
              <p>Description</p>
            </div>
            <div className="desc-control-two">
              <p style={{ textTransform: "capitalize" }}>
                {name === "change_of_salary" && "Change of Salary"}
                {name === "attendance" && "Attendance"}
                {name === "notice_period" && "Notice Period"}
              </p>
              <p>{status}</p>
              <p>{created_at}</p>
              <p>{content}</p>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  let { issueDescContent, issueDescOpen } = state.recordReducer;
  return { issueDescContent, issueDescOpen };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIssueClose: () => {
      dispatch({ type: ISSUE_CLOSE });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueDescription);
