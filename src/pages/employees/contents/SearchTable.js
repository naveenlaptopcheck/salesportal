import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { SEARCH_TABLE_CHANGE_EMP } from "../../../redux/actions";
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";

const SearchTable = ({ handleSearchChange,search }) => {
 
  let dispatch = useDispatch();

  const token = localStorage.getItem("token");
  
  const config = {
    headers: { Authorization: `${token}` },
  
  };

  


  return (
    <>
      <form action="" className="search-emp-form" onSubmit={(e)=>e.preventDefault()}>
        <input
          type="text"
          placeholder="Search"
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
      dispatch({ type: SEARCH_TABLE_CHANGE_EMP, payload: { search ,type} });
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchTable);
