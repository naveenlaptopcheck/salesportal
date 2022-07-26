import React, { useEffect } from 'react';
import { useState  } from 'react';
import { AiFillDatabase, AiOutlineFileAdd } from "react-icons/ai";
import { RiFileExcel2Fill } from "react-icons/ri";
import { connect ,useDispatch} from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
//import { saveAs } from "file-saver";
import axios from "axios";
import { TextField } from '@mui/material';
import {
    ADD_USER_FORM_OPEN,
    DATA_FETCHED,
    OPEN_CSV_MODAL,
    EMPLOYEES_DATA_FETCHED,
    SEARCH_TABLE_CHANGE
} from "../../redux/actions";
import Mob2 from "./contents/mobilerecord"
import AddUserForm from "./modals/AddUserForm";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import CsvModal from "./modals/CsvModal";
import EditUserForm from "./modals/EditUserForm";
import ViewUserModal from "./modals/ViewUserModal";
import Mob1 from './contents/mob1';
import DownloadEmployees from "./contents/DownloadEmployees";
import SearchTable from "./contents/SearchTable";
import TransactionsRecords from "./contents/transactionrecord";

import MsgModal from "../../components/MsgModal";
import LocalLoader from "../../components/LocalLoader";
//import OverdueList from "./contents/OverdueList";
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';


function Transactions({ handleCsvModal, handleAddFormOpen, apiDash,handleSearchChange,handleSearch ,fn}) {
    let { total_employees } = apiDash;
    let [val,setval]=useState("ref_id")
    let [val1,setval1]=useState("0")
    let [tot,setot]=useState(0)
    let [p,setp]=useState(3)
    let [h,seth]=useState(window.innerWidth)
    window.addEventListener("resize",()=>{
        seth(window.innerWidth)
    })
    const [currentPage, setCurrentPage] = useState(1);

    const token = localStorage.getItem("token");
    
    const config = {
      headers: { Authorization: `${token}` },
    
    };
    
    useEffect(()=>{
        if(val==="status"){
            return 
        }
        if(val==="tranaction_type"){
            dat(0)
            return 
        }
          handleSearch(val)
          handleSearchChange("",val)
         
    },[val])
  
    const dat=(e)=>{
       handleSearchChange(e,"tranaction_type")
       setCurrentPage(1)
    }
    const getAllEmployees = () => {
        handleSearchChange("","")
        setCurrentPage(1)
    }
    const gp=(e)=>{
        handleSearchChange(e,"status")
        setCurrentPage(1)

    }
    
  if(h>1000){
    return (
        <>
            <div className="employees">
            <div className="emp1">
                       <h1 style={{position:"relative",transform:"translateX(11px)"}}>{tot} Transactions Found </h1>
                 
                       <div className="emp2">
                       <button className='header-btn' style={{border:p===3?" 2px solid #00C805":""}} onClick={(e)=>{setp(3);getAllEmployees()}}>ALL</button>
                       <button className='header-btn' style={{border:p===0?" 2px solid #00C805":""}}  onClick={(e)=>{ setp(0) ;dat(0)}}>DEBIT</button>
                       <button className='header-btn'  style={{border:p===1?" 2px solid #00C805":""}}  onClick={(e)=>{ setp(1) ;dat(1)}}>CREDIT</button>
                       <button className='header-btn'  style={{border:p===2?" 2px solid #00C805":""}}  onClick={(e)=>{ setp(2) ;dat(2)}}>REFUND</button>

                     
                       <div style={{position:"absolute",right:"31%",top:"7%"}}> 
                 
                       <Select value={val} onChange={(e)=>{setval(e.target.value);
                                                          if(e.target.value==="status"){
                                                              gp(0)
                                                              setval1(0)
                                                          }}} 
                        sx={{width:"150px",fontSize:"12px",}} defaultValue={val} >
                               <MenuItem value="ref_id"  sx={{fontSize:"12px"}}>Ref  </MenuItem>
                               <MenuItem value="status"  sx={{fontSize:"12px"}}>status</MenuItem>
                               
                             
                           </Select>
                      
                           </div>
                       <div style={{position:"absolute",right:"15%",top:"8%"}}>
            
                            { val!="status"?(<div className='search-container'>
                                <SearchIcon className='search-icon' />
                                <SearchTable  search={val}/>
                            </div>):
                            (
                               <Select value={val1} onChange={(e)=>{setval1(e.target.value);gp(e.target.value);}} sx={{width:"150px",fontSize:"12px",}} defaultValue={val1} >
                               <MenuItem value="0"  sx={{fontSize:"12px"}}>Initiated </MenuItem>
                               <MenuItem value="1"  sx={{fontSize:"12px"}}>Pending</MenuItem>
                               <MenuItem value="2"  sx={{fontSize:"12px"}}>Completed </MenuItem>
                               <MenuItem value="3"  sx={{fontSize:"12px"}}>Failed</MenuItem>
                               <MenuItem value="4"  sx={{fontSize:"12px"}}>Settled </MenuItem>
                               <MenuItem value="5"  sx={{fontSize:"12px"}}>Refund initiated</MenuItem>
                               <MenuItem value="6"  sx={{fontSize:"12px"}}>Refund Settled</MenuItem>
                           </Select>)
                            }
                           
                            </div>    

                       </div>

                   </div>
                <div className='employees-wrap'>
                    <MsgModal />             { /* it pops up when the employee is deleted from the employee table or new employee is added */}
                    <CsvModal />              {/* to open 'Import Excel doc' form */}
                    <ViewUserModal />          {/* to open user details form by clicking user row */}
                    <ConfirmDeleteModal />       {/* to open delete user form under actions */}
                    <AddUserForm />                 {/* to add user in 'Add User' beside 'Download List' */}
                    <EditUserForm />              {/* to open user form under actions */}
                    <LocalLoader />                      {/* This loading component appears for some of the async operations on the portal like adding and deleting the users, todos etc */}
{/* 
                    <div className='nav-container'>
                        <div className='nav-container-left'>
                            <div className='search-container'>
                                <SearchIcon className='search-icon' />
                                <SearchTable />
                            </div>
                        </div>
                        <div className='nav-container-center'>
                            <div className='employees-container'>
                                <div className='employees-text'>
                                    <h2>Total Employees</h2>
                                </div>
                                <div className='employees-number'>
                                    <h1>{num}</h1>
                                </div>
                            </div>
                            <div>
                                <DownloadEmployees />
                            </div>
                        </div>
                        <div className='nav-container-right'>
                            <div className='right-container-div'>
                                <div>
                                    <button
                                        className='right-container-btn'
                                        onClick={handleCsvModal}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        BULK UPLOAD
                                    </button>
                                </div>
                                <div>
                                    <a href="https://finsire-assets.s3.ap-south-1.amazonaws.com/Sample_Excel.xlsx">
                                        <>Sample .xlsx file</>
                                    </a>
                                </div>
                            </div>
                            <div className='right-container-div'>
                                <div>
                                    <button
                                        className='right-container-btn'
                                        onClick={handleAddFormOpen}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        QUICK ADD
                                    </button>
                                </div>
                                <div>
                                    <p>Add single employee</p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* ------- Removing old nav bar ------- */}
                    {/* <div className="nav-wrap">
                        <nav className="records-nav">
                            <div className="add-search-user">
                                <SearchIcon />
                                <SearchTable />
                            </div>

                            <div className="upload-links">
                                <button onClick={handleCsvModal}>
                                    <>Import Excel Doc</>
                                    <RiFileExcel2Fill className="excel-icon" />
                                </button>
                                <a href="https://finsire-assets.s3.ap-south-1.amazonaws.com/Sample_Excel.xlsx">
                                    <>(Sample Excel)</>
                                </a>
                            </div>
                            <div className="add-search-user">
                                <DownloadEmployees />
                                <button className="add-user-btn" onClick={handleAddFormOpen}>
                                    <p className="add-user">Add User</p>
                                </button>
                            </div>
                        </nav>
                        {/* <button className="add-user-btn" onClick={handleAddFormOpen}>
                        <AiOutlineFileAdd className="add-user" />
                        </button> */}
                    {/* </div> */}
                    {/* ------- Removing old nav bar till here ------- */}
                    {/* <div><OverdueList /></div> */}
                   
                    <div className="table-container">
                       <TransactionsRecords tot={(e)=>setot(e)} currentPage={currentPage} setCurrentPage={(e)=>setCurrentPage(e)}/>
                    </div>
                </div>
            </div>
        </>
    );
}else{
    return (<>
        <div style={{display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{display:"flex",flexDirection:"column",marginTop:"20px"}}>
        <h1 style={{position:"relative",transform:"translateX(20px)",color:"#00394d"}}>{tot} Transactions Found </h1>

         <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"row",gap:"10px",paddingTop:"20px",justifyContent:"space-between"}}>
                       {/* <h1 style={{position:"relative",transform:"translateX(11px)"}}>{tot} EMPLOYEES FOUND</h1> */}

           
                     <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}> 
                 
                 <Select value={val} onChange={(e)=>{setval(e.target.value);
                                                    if(e.target.value==="status"){
                                                        gp(0)
                                                        setval1(0)
                                                    }}} 
                  sx={{width:"150px",fontSize:"12px",transform:"translate(16px)"}} defaultValue={val} >
                       
                         <MenuItem value="transaction_type"  sx={{fontSize:"12px"}}>Transaction Type</MenuItem>
                         <MenuItem value="status"  sx={{fontSize:"12px"}}>status</MenuItem>
                         <MenuItem value="ref_id"  sx={{fontSize:"12px"}}>Ref  </MenuItem>

                     </Select>
                
                     </div>
                
      
                     {  val==="status"&&<Select  onChange={(e)=>{gp(e.target.value);}} sx={{width:"150px",fontSize:"12px",transform:"translate(-16px)"}} defaultValue={"0"} >
                         <MenuItem value="0"  sx={{fontSize:"12px"}}>Initiated </MenuItem>
                         <MenuItem value="1"  sx={{fontSize:"12px"}}>Pending</MenuItem>
                         <MenuItem value="2"  sx={{fontSize:"12px"}}>Completed </MenuItem>
                         <MenuItem value="3"  sx={{fontSize:"12px"}}>Failed</MenuItem>
                         <MenuItem value="4"  sx={{fontSize:"12px"}}>Settled </MenuItem>
                         <MenuItem value="5"  sx={{fontSize:"12px"}}>Refund initiated</MenuItem>
                         <MenuItem value="6"  sx={{fontSize:"12px"}}>Refund Settled</MenuItem>
                     </Select>}
                  
                      


                      
                     {  val==="transaction_type"&&<Select  onChange={(e)=>{dat(e.target.value);}} sx={{width:"150px",fontSize:"12px",transform:"translate(-16px)"}} defaultValue={"0"} >
                         <MenuItem value="0"  sx={{fontSize:"12px"}}>Debit</MenuItem>
                         <MenuItem value="2"  sx={{fontSize:"12px"}}>Refund</MenuItem>
                         <MenuItem value="1"  sx={{fontSize:"12px"}}>Credit </MenuItem>
                      
                     </Select>}
                      </div>
                      </div>

         
<Mob2 tot={(e)=>setot(e)} currentPage={currentPage} setCurrentPage={(e)=>setCurrentPage(e)}></Mob2>
</div>
    </>)
}
}

const mapStateToProps = (state) => {
    const { apiDash, searchChangeValue } = state.recordReducer;
    
    return { apiDash ,searchChangeValue};
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleCsvModal: () => {
            dispatch({ type: OPEN_CSV_MODAL });
        },
        handleAddFormOpen: () => {
            dispatch({ type: ADD_USER_FORM_OPEN });
        },
       
        handleSearchChange: (search,type) => {
              dispatch({ type: SEARCH_TABLE_CHANGE, payload: { search:search,type:type } });
            },
            handleSearch:(search)=>{
                dispatch({ type: "SEARCH_EMP", payload: { search:search } });
            }
        
    };
};


  
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
