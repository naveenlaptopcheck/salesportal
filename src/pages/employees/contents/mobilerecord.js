import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import ReadOnlyRows from "./ReadOnlyRows";
import Pagination from '../../../components/Pagination';
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import At from "./act";
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


  const columns = [{field:"name",headerName:"Name",width:200},{field:"phone",headerName:"Phone",width:200},
  {field:"email",headerName:"Email",width:200},{field:"net_salary",headerName:"Salary",width:150},
  {field:"status",headerName:"Status",width:400},{field:"kyc",headerName:"Kyc",width:150},{field:"actions",headerName:"Actions",width:100}];
  
 return (<>
 <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",width:"100%",minHeight:"800px",transform:"translateY(10px)",}}>
{/* <DataGrid  rows={currentTableData} checkboxSelection={true}   disableColumnFilter={true} headerHeight={50}   hideFooter={true} columns={columns} rowHeight={40}  hideFooterPagination={true} sx={{fontSize:"14px",color:"#00394d",boxShadow:"0px 3px 32px rgb(0 0 0 / 12%)" }}
>

</DataGrid> */}

<TableContainer component={Paper} sx={{boxShadow:"0px 3px 32px rgb(0 0 0 / 12%)"}}  >
<Table sx={{minWidth:"800px"}} padding="checkbox" >
  <TableHead sx={{backgroundColor:"#E6F7FF",}}>
  <TableRow  selected="true">
  <TableCell> <Checkbox size="large"></Checkbox></TableCell>

    {columns.map((x)=>{
      return(
      <TableCell  sx={{width:x.width,fontSize:"18px",color:"#00394d",textAlign:"center",fontWeight:"bold"}}> {x.headerName}</TableCell>
      )
    })}

    </TableRow>
  </TableHead>
  <TableBody >
    {currentTableData.map((y)=>{
     
      return (
        <TableRow  hover={true} sx={{alignItems:"center",}}>
      
       <TableCell> <Checkbox size="large"></Checkbox></TableCell>

      <TableCell sx={{fontSize:"15px",color:"#00394d",whiteSpace:"nowrap",textAlign:"center"}}>{y.name}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d",textAlign:"center"}}>{y.phone}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d",textAlign:"center"}}>{y.email}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d",textAlign:"center"}}>{y.net_salary}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d",textAlign:"center"}}>{y.status}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d",textAlign:"center"}}>{y.kyc}</TableCell>
    
      <TableCell >
    <At status={y.status} kyc={y.kyc} id={y.id} v={v} up={(x)=>setv(x)}></At>
      </TableCell>
   
        </TableRow>
      )
    })}
  </TableBody>
</Table>

</TableContainer>

      <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"100px",transform:"translateY(30px)"}}>
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
