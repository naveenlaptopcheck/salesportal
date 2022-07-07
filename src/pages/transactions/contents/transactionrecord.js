import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import TableLoader from "./TableLoader";
import Pagination from '../../../components/Pagination';
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import ReadOnlyRowsT from "./ReadonlyRowst"
function TransactionsRecords({ records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue,tot,currentPage,setCurrentPage }) {
  let PageSize = 5;

  

  const [check,setcheck]=useState(false)
  const [v,setv]=useState(0)

  


  let dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };
  


  useEffect(() => {
   
    const {type,search}=searchChangeValue

  if(search===""){
   
    axios
      .get(`${process.env.REACT_APP_URL}/sales/transaction?page=${currentPage}`, config)
      .then(response => {
        tot(response.data.total_entries)
            
        
       
        return dispatch({
          type: EMPLOYEES_DATA_FETCHED,
          payload: {
            dataEmployee: response.data.transactions,
            dataTotalPages: response.data.total_pages,
          }
        })
      });
    }
    
    else{
      
      
      axios
      .post(`${process.env.REACT_APP_URL}/sales/transaction/search`,{
        "search_field": type,
        "search_term": search,
        "page":1
    }, config)
      .then(response => {
        tot(response.data.total_entries)
     
     
        return dispatch({
          type: EMPLOYEES_DATA_FETCHED,
          payload: {
            dataEmployee: response.data.transactions,
            dataTotalPages: response.data.total_pages,
          }
        })
      }).catch(err=>console.log(err));
    }
  }, [currentPage,searchChangeValue,v]);


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
  
 return (
    <>
      <div className="employees-table-box">
        <div className="employees-table">
          <table className="records-table">
            <thead >
              <tr >
            
                 <div className="rec1"> 
                  <div className="rec2">
                <Checkbox size="large"  onChange={(e)=>setcheck(e.target.checked)}></Checkbox>
                <th >Id</th>

               
            
                </div>
               
                
              
                <th style={{position:"absolute",left:"14.2%",}}>Type</th>


                <th style={{position:"absolute",left:"28%",}}> Ref </th>
                

                <th style={{position:"absolute",left:"43.8%",}}> Amount</th>
               

                <th style={{position:"absolute",left:"60%",}}> Created at </th>

            

                <th style={{position:"absolute",left:"77%",}}>Status </th>

                <th style={{position:"absolute",right:"3%",}}>Actions</th>

           </div>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((record) => {
                const { id } = record;
                return (
                  <>
                    <ReadOnlyRowsT key={id} className="read-only" record={record} check={check} cur={(f)=>setv(f)} v={v} />
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
export default connect(mapStateToProps)(TransactionsRecords);
