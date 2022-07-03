import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import ReadOnlyRows from "./ReadOnlyRows";
import TableLoader from "./TableLoader";
import Pagination from '../../../components/Pagination';
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { Skeleton } from "@mui/material";
function TableRecords({ records,tot, editContactId, apiRec, currentPage,setCurrentPage,apiRecLength, apiRecTotalPages, searchChangeValue1 }) {
  let PageSize =5;
  const [check,setcheck]=useState(false)
  const [v,setv]=useState(0)
 
 

 
  let dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };

  useEffect(() => {
   
    const {type,search}=searchChangeValue1

  if(search===""){
   
    axios
      .get(`${process.env.REACT_APP_URL}/sales/employee?page=${currentPage}`, config)
      .then(response => {
        tot(response.data.total_entries)
            
        
       
        return dispatch({
          type: EMPLOYEES_DATA_FETCHED,
          payload: {
            dataEmployee: response.data.employee,
            dataTotalPages: response.data.total_pages,
          }
        })
      });
    
    }
    
    else{
      
      
      axios
      .post(`${process.env.REACT_APP_URL}/sales/employee/search`,{
        "search_field": type,
        "search_term": search,
        "page":currentPage
    }, config)
      .then(response => {
        tot(response.data.total_entries)
        
     
     
        return dispatch({
          type: EMPLOYEES_DATA_FETCHED,
          payload: {
            dataEmployee: response.data.employee,
            dataTotalPages: response.data.total_pages,
          }
        })
      }).catch(err=>console.log(err));
    }
  }, [currentPage,searchChangeValue1,v]);



  // apiRec?.sort((a, b) => a.name.localeCompare(b.name));

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    // return apiRec.slice(firstPageIndex, lastPageIndex);
    return apiRec;
  }, [currentPage, apiRec]);

  // let currentTableData = currentData?.filter((user) => {
  //   let { name } = user;
  //   return name
  //     .toLowerCase()
  //     .includes(searchChangeValue.trim().toLowerCase());
  // });
  let currentTableData=currentData
  console.log(currentData)
 return (
    <div className="employees-table-box">
        <div className="employees-table">
          <table className="records-table">
            <thead >
              <tr >
            
                 <div className="rec1"> 
                  <div className="rec2">
                <Checkbox size="large"  onChange={(e)=>setcheck(e.target.checked)}></Checkbox>
               
                {/* <th>Id</th> */}
                </div>
                {/* <th style={{position:"absolute",left:"155px",}} >Company </th> */}
                <th style={{position:"absolute",left:"14%",}}>Name </th>


                <th style={{position:"absolute",left:"25%",}}>Phonenumber </th>
                

                <th style={{position:"absolute",left:"43.8%",}}>Email ID </th>
                <th style={{position:"absolute",left:"59.9%",}}>Salary </th>
               

                {/* <th style={{position:"absolute",left:"575px",}}>Aadhar </th>

                <th style={{position:"absolute",left:"720px",}}>PAN ID </th> */}

                <th style={{position:"absolute",left:"69.2%",}}>Status </th>

                <th style={{position:"absolute",left:"80%",}}>KYC</th>
                <th style={{position:"absolute",left:"90%",}}>Actions</th>

           </div>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((record) => {
              
                const { id } = record;
                return (
                  <>
                    <ReadOnlyRows key={id}  className="read-only"  record={record} check={check} v={v} up={(x)=>setv(x)}/>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      <Divider ></Divider>
      
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",bottom:"10px",left:"50%",right:"50%"}}>
          {apiRec.length !== 0 &&
            <Pagination
              className="employees-pagination"
              currentPage={currentPage}
              //totalCount={Math.ceil(apiRec.length/PageSize)}
             totalCount={apiRecTotalPages}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />}
        </div>
      </div>
     
  
  );

}

//Redux
const mapStateToProps = (state) => {
  const { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue1 } =
    state.recordReducer;
   
    
  return { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue1 };
};
// const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps)(TableRecords);
