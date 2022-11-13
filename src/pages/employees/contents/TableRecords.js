import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import ReadOnlyRows from "./ReadOnlyRows";
import TableLoader from "./TableLoader";
import Pagination from '../../../components/Pagination';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Modal1 from "./usermodal"
import Modal from "@mui/material/Modal"
import At from "./act.js"
function TableRecords({ records,tot,editContactId, apiRec, currentPage,setCurrentPage,apiRecLength, apiRecTotalPages, searchChangeValue1 }) {
  let PageSize =5;
  const [check,setcheck]=useState(false)
  const [v,setv]=useState(0)
  const[h,seth]=useState(window.innerWidth)
  const [show_modal,set_modal]=useState(false)
  const [modal_data,set_modald]=useState({})
const display_data=(y)=>{
set_modal(true)
set_modald(y)
}
const close_modal=()=>{
  set_modal(false)
  

}
 useEffect(()=>{

seth(window.innerWidth)
 },[window.innerWidth])
const ft=()=>{
  if(h<1500){
    return "14%"
  }else if(h<1600){
    return "12.8%"
  }
  else{
  let y=9+(h-1400)/300
    return `${y}%`
  }
}
 
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
  {field:"email",headerName:"Email",width:200},{field:"Company ",headerName:"Company",width:250},{field:"Aadhar Id",headerName:"Aadhar Id",width:250},{field:"pan id ",headerName:"pan id ",width:200},{field:"account_number",headerName:"Account Number",width:200},{field:"net_salary",headerName:"Salary",width:150},
  {field:"status",headerName:"Status",width:200},{field:"kyc",headerName:"Kyc",width:150},{field:"actions",headerName:"Actions",width:100}];
  
 return (
    <div className="employees-table-box">
    <Modal   style={{display:"flex",alignItems:"center",justifyContent:"center"}} open={show_modal} >
   
      <Modal1 data={modal_data} change={()=>close_modal()} ></Modal1>
   
    </Modal>
        <div className="employees-table" >
        <TableContainer component={Paper} className="tablebox"  >
<Table sx={{fontSize:"20px",overflowX:"scroll",minWidth:"1750px"}} padding="checkbox" >
  <TableHead sx={{backgroundColor:"#E6F7FF",}}>
  <TableRow selected={true} key={"employee"}> 
  <TableCell> <Checkbox size="large"></Checkbox></TableCell>

    {columns.map((x)=>{
      return(
      <TableCell key={x.headerName}  sx={{width:x.width,fontSize:"18px",color:"#00394d",textAlign:"center",fontWeight:"bold"}}> {x.headerName}</TableCell>
      )
    })}

    </TableRow>
  </TableHead>
  <TableBody sx={{cursor:'pointer'}} >
    {currentTableData.map((y)=>{
     
        return (
        <TableRow  hover={true} sx={{alignItems:"center",}} key={y.id} > 
      
       <TableCell> <Checkbox size="large"></Checkbox></TableCell>

      <TableCell onClick={(e)=>display_data(y)} className="textsize" sx={{cursor:"pointer",color:"#00394d",whiteSpace:"nowrap",textAlign:"center"}}>{y.name}</TableCell>
      <TableCell className="textsize" sx={{color:"#00394d",textAlign:"center"}}>{y.phone}</TableCell>
      <TableCell className="textsize" sx={{color:"#00394d",textAlign:"center"}}>{y.email===null?"-":y.email}</TableCell>
      <TableCell className="textsize" sx={{color:"#00394d",textAlign:"center"}}>{y.company_name===null?"-":y.company_name}</TableCell>
      <TableCell className="textsize" sx={{color:"#00394d",textAlign:"center"}}>{y.aadhar===undefined?"-":y.aadhar}</TableCell>
      <TableCell className="textsize"sx={{color:"#00394d",textAlign:"center"}}>{y.pan_card===undefined?"-":y.pan_card}</TableCell>
      <TableCell className="textsize" sx={{color:"#00394d",textAlign:"center"}}> {y.account_number}</TableCell>

     <TableCell className="textsize" sx={{color:"#00394d",textAlign:"center"}}>{y.net_salary}</TableCell>
      <TableCell className="textsize"sx={{color:"#00394d",textAlign:"center"}}>{y.status}</TableCell>
 
      <TableCell className="textsize"sx={{color:"#00394d",textAlign:"center"}}>{y.kyc}</TableCell>
       <TableCell className="textsize" sx={{color:"#00394d",textAlign:"center"}}>    <At status={y.status} kyc={y.kyc} id={y.id} v={v} up={(x)=>setv(x)}></At></TableCell>



      

   
   
        </TableRow>
      )
    })}
  </TableBody>
</Table>

</TableContainer>
        </div>
      
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
