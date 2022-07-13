import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import TableLoader from "./TableLoader";
import Pagination from '../../../components/Pagination';
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import At from "./act";
import ReadOnlyRowsT from "./ReadonlyRowst"
function  Mob2({ records, editContactId, apiRec, apiRecLength, se,apiRecTotalPages, searchChangeValue,tot,currentPage,setCurrentPage }) {
  let PageSize = 5;

  

  const [check,setcheck]=useState(false)
  const [v,setv]=useState(0)


  let rp=(e)=>{
   
    if(e==="refund_settled"){
      return "Refund Settled"

    }else if (e==="refund_initiated"){
      return "Refund Initiated"

    }else{
      return e
    }
  }
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
  }, [currentPage,searchChangeValue,v,se]);


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
  const columns = [{field:"id",headerName:"ID",width:60},{field:"tranaction_type",headerName:"Type",width:70},{field:"ref_id",headerName:"Reference Id",width:170},{field:"amount",headerName:"Amount",width:100},{field:"status",headerName:"Status",width:100},{field:"date",headerName:"Date",width:200},{field:"Actions",headerName:"Actions",width:100}]

 

 return (
    <>
       <div style={{display:"flex",flexDirection:"column", width:"100%",minHeight:"700px",transform:"translateY(10px)",overflow:"scroll"}}>




       <TableContainer component={Paper} sx={{boxShadow:"0px 3px 32px rgb(0 0 0 / 12%)"}} >
<Table sx={{minWidth:"800px"}}  padding="checkbox">
  <TableHead sx={{backgroundColor:"#E6F7FF",}}>
  <TableRow  selected="true">
  <TableCell> <Checkbox size="large"></Checkbox></TableCell>

    {columns.map((x)=>{
      return(
      <TableCell  sx={{width:x.width,fontSize:"18px",color:"#00394d"}}>{x.headerName}</TableCell>
      )
    })}

    </TableRow>
  </TableHead>
  <TableBody>
    {currentTableData.map((y)=>{
     
      return (
        <TableRow hover={true}  sx={{height:"30px",alignItems:"center"}}>
      
       <TableCell > <Checkbox size="large"></Checkbox></TableCell>

      <TableCell sx={{fontSize:"15px",color:"#00394d"}}>{y.id}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d"}}>{y.tranaction_type}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d"}}>{y.ref_id}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d",textAlign:"center"}}>{y.amount===null?"-":y.amount}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d"}}>{rp(y.status)}</TableCell>
      <TableCell sx={{fontSize:"15px",color:"#00394d",whiteSpace:"nowrap"}}>{y.date}</TableCell>
    
      <TableCell >
    <At status={y.status}  id={y.id} v={v} cur={(x)=>setv(x)}></At>
      </TableCell>
   
        </TableRow>
      )
    })}
  </TableBody>
</Table>

</TableContainer>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"150px"}}>
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
  const { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue ,search} =
    state.recordReducer;
    const se=search
  return { records, editContactId, apiRec, apiRecLength, apiRecTotalPages, searchChangeValue ,se};
};
// const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps)(Mob2);
