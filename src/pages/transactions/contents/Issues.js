import React from "react";
import { BsShieldFillExclamation } from "react-icons/bs";
import { connect } from "react-redux";
import SVGC from "../../../components/SVGs/SVGC";
import { ISSUE_CLICKED } from "../../../redux/actions";

const Issues = ({ apiIssues, apiRec, handleIssueId }) => {
  //console.log(apiRec);

  if (apiIssues.length === 0) {
    return (
      <>
        <div className="issues-wrap">
          <div className="issues-logo">
            <h3>Issues</h3>
            <BsShieldFillExclamation className="issues-icon" />
          </div>
          <div className="all-issues">
            <div
              className="no-issues"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SVGC />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    //console.log(attendIssue);
    return (
      <>
        <div className="issues-wrap">
          <div className="issues-logo">
            <h3>Issues</h3>
            <BsShieldFillExclamation className="issues-icon" />
          </div>
          <div className="all-issues">
            <ul className="issue-ul">
              {apiIssues.map((todo) => {
                const { employee_id, status, id, name } = todo;
                let [employee] = apiRec.filter((rec) => {
                  let { id } = rec;
                  return id === employee_id;
                });
                let emp_name = employee.name;

                return (
                  <li
                    onClick={() => {
                      handleIssueId(todo);
                    }}
                  >
                    <div className="head-id">
                      {name === "change_of_salary" && (
                        <p className="title-head">Change of Salary</p>
                      )}
                      {name === "notice_period" && (
                        <p className="title-head">Notice Period</p>
                      )}
                      {name === "attendance" && (
                        <p className="title-head">Attendance</p>
                      )}
                      {name === "bank_information" && (
                        <p className="title-head">Bank Information</p>
                      )}
                      <p>#{id}</p>
                    </div>
                    <div className="name-date">
                      <p>{emp_name}</p>
                      <p>{status}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
};

//Redux
const mapStateToProps = (state) => {
  const { apiIssues, apiRec } = state.recordReducer;
  return { apiIssues, apiRec };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIssueId: (issue) => {
      dispatch({ type: ISSUE_CLICKED, payload: { issue } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
