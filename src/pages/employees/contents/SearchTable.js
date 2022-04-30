import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { SEARCH_TABLE_CHANGE } from "../../../redux/actions";
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";

const SearchTable = ({ handleSearchChange }) => {
  let dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };

  const handleSearch = (searchValue) => {
    axios
      .get(`${process.env.REACT_APP_URL}/console/search?search_term=${searchValue}`, config)
      .then(response => {
        return dispatch({
          type: EMPLOYEES_DATA_FETCHED,
          payload: {
            dataEmployee: response.data,
            dataTotalPages: 1,
          }
        })
      });
  }

  const getAllEmployees = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/console/employee?page=1`, config)
      .then(response => {
        return dispatch({
          type: EMPLOYEES_DATA_FETCHED,
          payload: {
            dataEmployee: response.data.employee,
            dataTotalPages: response.data.total_pages,
          }
        })
      });
  }

  return (
    <>
      <form action="" className="search-emp-form">
        <input
          type="text"
          placeholder="Employee Name"
          onChange={(e) => {
            let search = e.target.value;
            if (search) {
              handleSearch(search);
            } else {
              getAllEmployees();
            }
            // handleSearchChange(search);
          }}
        />
      </form>
    </>
  );
};

//Redux

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchChange: (search) => {
      dispatch({ type: SEARCH_TABLE_CHANGE, payload: { search } });
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchTable);
