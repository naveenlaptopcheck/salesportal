import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import ReadOnlyRows from "./ReadOnlyRows";
import TableLoader from "./TableLoader";
import Pagination from '../../../components/Pagination';
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";

function TableRecords({ records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue }) {
  let PageSize = apiRecLength;

  const [currentPage, setCurrentPage] = useState(1);

  //console.log(apiRec.length);
  let dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/console/employee?page=${currentPage}`, config)
      .then(response => {
        return dispatch({
          type: EMPLOYEES_DATA_FETCHED,
          payload: {
            dataEmployee: response.data.employee,
            dataTotalPages: response.data.total_pages,
          }
        })
      });
  }, [currentPage]);


  apiRec?.sort((a, b) => a.name.localeCompare(b.name));

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    // return apiRec.slice(firstPageIndex, lastPageIndex);
    return apiRec;
  }, [currentPage, apiRec]);

  let currentTableData = currentData?.filter((user) => {
    let { name } = user;
    return name
      .toLowerCase()
      .includes(searchChangeValue.trim().toLowerCase());
  });

  return (
    <>
      <div className="employees-table-box">
        <div className="employees-table">
          <table className="records-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Salary</th>
                <th>Access Amount</th>
                <th>Status</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((record) => {
                const { id } = record;
                return (
                  <>
                    <ReadOnlyRows key={id} className="read-only" record={record} />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="employees-table-pagination">
          {apiRec.length !== 0 &&
            <Pagination
              className="employees-pagination"
              currentPage={currentPage}
              // totalCount={PageSize * apiRecTotalPages}
              totalCount={apiRecTotalPages}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />}
        </div>
      </div>
    </>
  );

}

//Redux
const mapStateToProps = (state) => {
  const { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue } =
    state.recordReducer;
  return { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue };
};
// const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps)(TableRecords);
