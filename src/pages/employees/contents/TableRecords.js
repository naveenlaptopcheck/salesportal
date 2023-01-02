import React, { useState, useMemo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import Pagination from '../../../components/Pagination';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import { EMPLOYEES_DATA_FETCHED } from "../../../redux/actions";
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Modal1 from "./usermodal"
import Modal from "@mui/material/Modal"
import CHECK from "./checkbox";
import At from "./act.js"
import EmailIcon from '@mui/icons-material/Email';

function TableRecords({ records,tot,editContactId, setn2,n3,setn3,apiRec,check, currentPage,setCurrentPage,apiRecLength, apiRecTotalPages, searchChangeValue1 }) {
  let PageSize =5;
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
  if(check===true){
    var y=[]
       for (var i=0;i<currentData.length;i++){

        y.push([currentData[i].name,currentData[i].id])

       }
       setn3([...n3,...y])
  }else{
    setn3([])
  }
   },[check])
const disp1=()=>{

  setn2(true)
}
 useEffect(()=>{
seth(window.innerWidth)
 },[window.innerWidth])


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
  {field:"email",headerName:"Email",width:200},{field:"Company ",headerName:"Company",width:180},{field:"Aadhar Id",headerName:"Aadhar Id",width:200},{field:"pan id ",headerName:"pan id ",width:200},{field:"account_number",headerName:"Account Number",width:200},{field:"net_salary",headerName:"Salary",width:150},
  {field:"status",headerName:"Status",width:200},{field:"Enach",headerName:"Enach",width:150},{field:"kyc",headerName:"Kyc",width:150},{field:"actions",headerName:"Actions",width:100}];
  
 return (
    <div className="employees-table-box">
    <Modal   style={{display:"flex",alignItems:"center",justifyContent:"center"}} open={show_modal} >
   
      <Modal1 data={modal_data} change={()=>close_modal()} ></Modal1>
   
    </Modal>
        <div className="employees-table" >
        <TableContainer component={Paper} className="tablebox"  >
<Table sx={{fontSize:"20px",overflowX:"scroll",}} padding="checkbox" >
  <TableHead sx={{backgroundColor:"#E6F7FF",minheight:"30px"}}>
  <TableRow selected={true} key={"employee"}> 

  <TableCell> 
  <div id="notific" style={{padding:"8px",opacity:0}}>
  <EmailIcon   fontSize="large"  ></EmailIcon>
  
  </div>


  </TableCell>

    {columns.map((x)=>{
      return(
      <TableCell key={x.headerName}  sx={{borderRight:"1px solid lightgray",minWidth:x.width,fontSize:"18px",color:"#00394d",textAlign:"center",fontWeight:"bold",paddingLeft:"10px",paddingRight:"10px"}}> {x.headerName}</TableCell>
      )
    })}

    </TableRow>
  </TableHead>
  
  <TableBody sx={{cursor:'pointer'}} >
    {currentTableData.map((y)=>{
        return (
        <TableRow  hover={true} sx={{alignItems:"center",}} key={y.id} > 
      
       <TableCell><CHECK check={check} s3={setn3} s4={n3} emp={y.name} id={y.id} ></CHECK></TableCell>

      <TableCell onClick={(e)=>display_data(y)} className="textsize" sx={{cursor:"pointer",color:"#00394d",whiteSpace:"nowrap",textAlign:"center",paddingLeft:"20px",paddingRight:"20px"}}>{y.name}</TableCell>
      <TableCell className="textsize" sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.phone}</TableCell>
      <TableCell className="textsize" sx={{paddingLeft:"20px",paddingRight:"20px",border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.email===null?"-":y.email}</TableCell>
      <TableCell className="textsize" sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.company_name===null?"-":y.company_name}</TableCell>
      <TableCell className="textsize" sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.aadhar===undefined?"-":y.aadhar}</TableCell>
      <TableCell className="textsize"sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.pan_card===undefined?"-":y.pan_card}</TableCell>
      <TableCell className="textsize" sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}> {y.account_number}</TableCell>

     <TableCell className="textsize" sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.net_salary}</TableCell>
      <TableCell className="textsize"sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.status}</TableCell>
      <TableCell className="textsize"sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.enach?"True":"False"}</TableCell>

      <TableCell className="textsize"sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>{y.kyc}</TableCell>
       <TableCell className="textsize" sx={{border:"1px solid lightgray",color:"#00394d",textAlign:"center"}}>    <At status={y.status} kyc={y.kyc} enach={y.enach} id={y.id} v={v} up={(x)=>setv(x)}></At></TableCell>



      

   
   
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
