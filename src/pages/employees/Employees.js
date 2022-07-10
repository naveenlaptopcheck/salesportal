import React, { useEffect } from 'react';
import { useState  } from 'react';
import { AiFillDatabase, AiOutlineFileAdd } from "react-icons/ai";
import { RiFileExcel2Fill } from "react-icons/ri";
import { connect,useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import Mrecords from "./contents/mobilerecord"
//import { saveAs } from "file-saver";
import axios from "axios";
import { TextField } from '@mui/material';
import {
    ADD_USER_FORM_OPEN,
    DATA_FETCHED,
    OPEN_CSV_MODAL,
    SEARCH_TABLE_CHANGE_EMP
} from "../../redux/actions";
import "./mp.css"
import Mob1 from "./contents/mobs"
// import AddUserForm from "./modals/AddUserForm";
// import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
// import CsvModal from "./modals/CsvModal";
// import EditUserForm from "./modals/EditUserForm";
// import ViewUserModal from "./modals/ViewUserModal";

// import DownloadEmployees from "./contents/DownloadEmployees";
import SearchTable from "./contents/SearchTable";
import TableRecords from "./contents/TableRecords";

// import MsgModal from "../../components/MsgModal";
// import LocalLoader from "../../components/LocalLoader";
//import OverdueList from "./contents/OverdueList";
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { EMPLOYEES_DATA_FETCHED } from "../../redux/actions";



function Employees({ handleCsvModal, handleAddFormOpen, apiDash ,handleSearchChange,handleSearch}) {
    let { total_employees } = apiDash;
    let [val ,setval]=useState("name")
    let [tot,setot]=useState(0)
    let [p,setp]=useState(3)
    let [page,setpage]=useState(1)
    let [val1,setval1]=useState("0")
    let [h,seth]=useState(window.innerWidth)
    useEffect(()=>{
        handleSearch(val)
        

    },[val])
    window.addEventListener("resize",()=>{
        seth(window.innerWidth)
    }, val)

    const token = localStorage.getItem("token");
    
    const config = {
      headers: { Authorization: `${token}` },
    
    };
  
    const dat=(e)=>{
       
         setpage(1)
         handleSearchChange(e,"kyc")
       
    }
    const getAllEmployees = () => {
        setpage(1)
        handleSearchChange("","")
      }
      const gp=(e)=>{
        handleSearchChange(e,"status")


      }
    
    
if(h>1000){
    return (
        <>
            <div className="employees">
            <div className="emp1">
                       <h1 style={{position:"relative",transform:"translateX(11px)"}}>{tot} EMPLOYEES FOUND</h1>
                 
                       <div className="emp2" >
                    
                       <button className='header-btn' style={{border:p===3?" 2px solid #00C805":""}} onClick={(e)=>{setp(3);getAllEmployees()}} >ALL</button>
                       <button className='header-btn' style={{border:p===1?" 2px solid #00C805":""}} onClick={(e)=>{ setp(1) ;dat(1)}}>PENDING</button>
                       <button className='header-btn'  style={{border:p===2?" 2px solid #00C805":""}} onClick={(e)=>{ setp(2) ;dat(2)}} >COMPLETE</button>
                       <button className='header-btn'  style={{border:p===0?" 2px solid #00C805":""}} onClick={(e)=>{ setp(0) ;dat(0)}}>INCOMPLETE</button>
                       
                    
                       <div style={{position:"absolute",right:"420px",top:"10px"}}> 
                 
                       <Select value={val} onChange={(e)=>{setval(e.target.value);
                       if(e.target.value==="status"){
                           gp(0);
                       }}
                       } sx={{width:"150px",fontSize:"12px",}} defaultValue={val} >
                               <MenuItem value="name" sx={{fontSize:"12px"}}>Employee Name</MenuItem>
                               <MenuItem value="email"  sx={{fontSize:"12px"}}>Email Id</MenuItem>
                               <MenuItem value="status"  sx={{fontSize:"12px"}}>Status</MenuItem>
                              
                              
                           </Select>
                      
                           </div>
                           <div style={{position:"absolute",right:"198px",top:"10px"}}>
            
            { val!="status"?(<div className='search-container'>
                <SearchIcon className='search-icon' />
                <SearchTable  search={val}/>
            </div>):
            (
               <Select value={val1} onChange={(e)=>{setval1(e.target.value);gp(e.target.value);}} sx={{width:"150px",fontSize:"12px",}} defaultValue={val1} >
               <MenuItem value="0"  sx={{fontSize:"12px"}}>Active</MenuItem>
               <MenuItem value="1"  sx={{fontSize:"12px"}}>Inactive </MenuItem>
           </Select>)
            }
           
            </div>   
                       </div>

                   </div>
                <div className='employees-wrap' >
                  
                     {/* This loading component appears for some of the async operations on the portal like adding and deleting the users, todos etc */}
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
                        <TableRecords val={val} tot={(e)=>setot(e)} currentPage={page} setCurrentPage={setpage}  />
                    </div>
                </div>
            </div>
        </>
    );}else{
        return (<>
        <div style={{display:"flex",flexDirection:"column"}}>
         <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"row",gap:"10px",paddingTop:"20px",justifyContent:"space-between"}}>
                       {/* <h1 style={{position:"relative",transform:"translateX(11px)"}}>{tot} EMPLOYEES FOUND</h1> */}
                  
                       {/* <div className='rt'>
                       <SearchIcon sx={{marginLeft:"4px",width:"40px",fontSize:"20px",backgroundColor:"C0C0C0"}} />
               <Mob1 search={val}></Mob1>
            </div> */}
                       <Select value={val} onChange={(e)=>{setval(e.target.value)}} sx={{width:"150px",fontSize:"12px",transform:"translateX(20px)"}}  defaultValue={val} >
                               <MenuItem value="name" sx={{fontSize:"12px"}}>Employee Name</MenuItem>
                               <MenuItem value="email"  sx={{fontSize:"12px"}}>Email Id</MenuItem>
                             
                              
                              
                           </Select>
                      
               
            </div>
           
              
                    

                  
      <Mrecords val={val} tot={(e)=>setot(e)} currentPage={page} setCurrentPage={setpage}></Mrecords>
      </div>
        </>)
    }
}

const mapStateToProps = (state) => {
    const { apiDash } = state.recordReducer;
  
    return { apiDash};
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
            dispatch({ type: SEARCH_TABLE_CHANGE_EMP, payload: { search ,type} });
          },
          handleSearch:(search)=>{
            dispatch({ type: "SEARCH_EMP", payload: { search} });
          }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
