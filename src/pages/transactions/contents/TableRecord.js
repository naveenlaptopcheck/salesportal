import React from "react";
import { connect } from "react-redux";
import ReadOnlyRow from "./ReadOnlyRow";
import TableLoader from "./TableLoader";

function TableRecord({ records, editContactId, apiRec, searchChangeValue }) {
  //console.log(apiRec.length);
  if (apiRec.length === 0) {
    return (
      <>
        <table className="records-table">
          <thead>
            <tr>
              <th>
                {" "}
                Employee <br /> Name{" "}
              </th>
              <th>
                Employee Net
                <br />
                Salary
              </th>
              <th>
                Employee Mobile <br /> No.
              </th>
              <th>
                Employee
                <br /> Status
              </th>

              <th>
                Net Accessible <br /> Amount
              </th>
              <th>
                Switch <br />
                Employee
              </th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
        <TableLoader />
      </>
    );
  } else {
    apiRec.sort((a, b) => a.name.localeCompare(b.name));
    let newData = apiRec.filter((user) => {
      let { name } = user;
      return name
        .toLowerCase()
        .includes(searchChangeValue.trim().toLowerCase());
    });
    //console.log(newData);
    return (
      <>
        <table className="records-table">
          <thead>
            <tr>
              <th>
                {" "}
                Employee <br /> Name{" "}
              </th>
              <th>Net Salary</th>
              <th>Mobile No.</th>

              <th>
                Net Accessible <br /> Amount
              </th>
              <th>Switch</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newData.map((record) => {
              const { id } = record;
              return (
                <>
                  <ReadOnlyRow key={id} className="read-only" record={record} />
                </>
              );
            })}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

//Redux
const mapStateToProps = (state) => {
  const { records, editContactId, apiRec, searchChangeValue } =
    state.recordReducer;
  return { records, editContactId, apiRec, searchChangeValue };
};
// const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps)(TableRecord);
