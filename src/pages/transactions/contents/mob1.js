import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { SEARCH_TABLE_CHANGE } from "../../../redux/actions";
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";


const SearchTable = ({ handleSearchChange ,search}) => {
  let dispatch = useDispatch();

  // const token = localStorage.getItem("token");
  // const config = {
  //   headers: { Authorization: `${token}` },
  // };

  // const handleSearch = (searchValue) => {
  //   axios
  //     .post(`${process.env.REACT_APP_URL}/sales/transaction/search`,{
  //       "search_field": search,
  //       "search_term": searchValue,
  //   }, config)
  //     .then(response => {
     
     
  //       return dispatch({
  //         type: EMPLOYEES_DATA_FETCHED,
  //         payload: {
  //           dataEmployee: response.data.transactions,
  //           dataTotalPages: response.data.total_pages,
  //         }
  //       })
  //     }).catch(err=>console.log(err));
  // }

  // const getAllEmployees = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_URL}/sales/transaction?page=1`, config)
  //     .then(response => {
  //       return dispatch({
  //         type: EMPLOYEES_DATA_FETCHED,
  //         payload: {
  //           dataEmployee: response.data.transactions,
  //           dataTotalPages: response.data.total_pages,
  //         }
  //       })
  //     }).catch(err=>console.log(err));
  // }

  return (
    <>
   
      <form action="" className="search-emp-form">
        <input
          type="text"
          style={{border:"none",outline:"none"}}
          placeholder="search"
          onChange={(e) => {
            
            let search1 = e.target.value;
            handleSearchChange(search1,search);
      
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
    handleSearchChange: (search,type) => {
      dispatch({ type: SEARCH_TABLE_CHANGE, payload: { search:search,type:type } });
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchTable);
