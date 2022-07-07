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
import { DataGrid } from '@mui/x-data-grid';
import "./mob.css"
function MRecords({ records,tot, editContactId, apiRec, currentPage,setCurrentPage,apiRecLength, apiRecTotalPages, searchChangeValue1}) {
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


  const columns = [{field:"name",headerName:"Name",width:120},{field:"phone",headerName:"Phone",width:120},{field:"email",headerName:"Email",width:170},{field:"net_salary",headerName:"Salary",width:100},{field:"status",headerName:"Status"},{field:"kyc",headerName:"Kyc"}
 
  ];
  
 return (<>
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
  const { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue1 } =
    state.recordReducer;
   
    
  return { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue1 };
};
// const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps)(MRecords);
