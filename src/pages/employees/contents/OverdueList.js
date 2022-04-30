import { differenceInDays, differenceInCalendarDays, parse } from "date-fns";
import { MdOutlinePendingActions, MdPayment } from "react-icons/md";
import { VscCircleFilled } from "react-icons/vsc";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import moment from "moment";

import { connect, useDispatch, useSelector } from "react-redux";
import {
  ISSUE_CLICKED,
  OVERDUE_ID_REMOVE,
  OVERDUE_ID_SET,
} from "../../../redux/actions";

const OverdueList = ({ apiDefaulter, apiProfile }) => {
  let name = localStorage.getItem("name");

  let dispatch = useDispatch();
  let { overdueDropId } = useSelector((state) => state.recordReducer);
  if (apiDefaulter.length === 0) {
    return (
      <>
        <div className="attendance-wrap">
          <div className="attendance-logo">
            <h3>Overdue List</h3>
            <MdOutlinePendingActions className="attendance-icon" />
          </div>
          <div className="attendance">
            <ul className="attendance-ul">
              <li className="total-overdue">
                <p>Totat Amount : &#8377; 0</p>
                <button className="overdue-btn">
                  <MdPayment className="overdue-icon" /> <span>Pay</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    let totalOverdue = apiDefaulter.reduce((acc, curr) => {
      let { amount } = curr;
      return (acc = acc + amount);
    }, 0);

    return (
      <>
        <div className="attendance-wrap">
          <div className="attendance-logo">
            <h3>Overdue List</h3>
            <MdOutlinePendingActions className="attendance-icon" />

            <a
              style={{ textDecoration: "none", fontSize: "1.5rem" }}
              href="%REACT_APP_URL%/console/record/defaulter_download"
            >
              Download
            </a>
            <div className="total-overdue"></div>
          </div>
          <div className="attendance">
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                marginLeft: "0.4rem",
              }}
            >
              Overall Overdue
            </p>
            <ul className="attendance-ul">
              <li className="total-overdue">
                <p>{name}</p>
                <span>&#8377; {totalOverdue}</span>
                <button className="overdue-btn">PAY</button>
              </li>
              <div className="overdue-ul"></div>

              {apiDefaulter.map((defaulter) => {
                const {
                  name,
                  id,
                  amount,
                  due_date,
                  net_salary,
                  revised_salary,
                } = defaulter;

                //Overdue days calculation
                let dueDate = new Date(due_date)
                  .toLocaleDateString()
                  .split("/");
                let today = new Date().toLocaleDateString().split("/");

                const overdue_days = differenceInDays(
                  new Date(today[2], today[0] - 1, today[1]),
                  new Date(dueDate[2], dueDate[1] - 1, dueDate[0])
                );

                if (id !== overdueDropId) {
                  return (
                    <li>
                      <div className="name-date">
                        <p className="title-head">{name}</p>
                        <div className="def-date">
                          <VscCircleFilled className="dot-icon" />
                          <p>
                            {overdue_days} <span>days overdue</span>{" "}
                          </p>
                        </div>
                        <BiChevronDown
                          className="drop-icon"
                          onClick={() => {
                            dispatch({
                              type: OVERDUE_ID_SET,
                              payload: { id },
                            });
                          }}
                        />
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li style={{ borderRadius: "0 0 8px 8px" }}>
                      <div className="name-date">
                        <p className="title-head">{name} </p>
                        <div className="def-date">
                          <VscCircleFilled className="dot-icon" />
                          <p>
                            {overdue_days} <span>days overdue</span>{" "}
                          </p>
                        </div>
                        <BiChevronUp
                          className="drop-icon"
                          onClick={() => {
                            dispatch({ type: OVERDUE_ID_REMOVE });
                          }}
                        />
                      </div>
                      <div className="overdue-under"></div>
                      <div className="overdue-extra-det">
                        <div className="overdue-control">
                          <p>Overdue Amount</p>
                          <h2>&#8377; {amount}</h2>
                        </div>
                        <div className="overdue-control">
                          <p>Net Salary</p>
                          <h2>&#8377; {net_salary}</h2>
                        </div>
                        <div className="overdue-control">
                          <p>Revised Salary</p>
                          <h2>&#8377; {revised_salary}</h2>
                        </div>
                      </div>
                    </li>
                  );
                }
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
  const { apiIssues, apiRec, apiDefaulter, apiProfile } = state.recordReducer;
  return { apiIssues, apiRec, apiDefaulter, apiProfile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIssueId: (issue) => {
      dispatch({ type: ISSUE_CLICKED, payload: { issue } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverdueList);
