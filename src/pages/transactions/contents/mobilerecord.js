import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import TableLoader from "./TableLoader";
import Pagination from '../../../components/Pagination';
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { DataGrid } from '@mui/x-data-grid';

import ReadOnlyRowsT from "./ReadonlyRowst"
function  Mob2({ records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue,tot,currentPage,setCurrentPage }) {
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
        "page":currentPage
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
  const columns = [{field:"id",headerName:"ID",width:60},{field:"tranaction_type",headerName:"Type",width:70},{field:"ref_id",headerName:"Reference Id",width:170},{field:"amount",headerName:"Amount",width:100},{field:"status",headerName:"Status"},{field:"date",headerName:"Date",width:200}
 
];

 return (
    <>
       <div style={{display:"flex",flexDirection:"column",justifyContent:"center", width:"100%",minHeight:"800px",transform:"translateY(10px)",}}>
<DataGrid rows={currentTableData} checkboxSelection={true}   disableColumnFilter={true} headerHeight={50}  hideFooter={true} columns={columns} rowHeight={40}  hideFooterPagination={true} sx={{fontSize:"14px",color:"#00394d",}}   
>

</DataGrid>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",transform:"translateY(-95px)"}}>
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
export default connect(mapStateToProps)(Mob2);
