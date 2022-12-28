import React, { useEffect } from 'react';
import { useState  } from 'react';
import { AiFillDatabase, AiOutlineFileAdd } from "react-icons/ai";
import { RiFileExcel2Fill } from "react-icons/ri";
import { connect,useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import Mrecords from "./contents/mobilerecord"
import {Button, Menu} from '@mui/material';
//import { saveAs } from "file-saver";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField } from '@mui/material';
import Popper from '@mui/material/Popper';

import {
    ADD_USER_FORM_OPEN,
    DATA_FETCHED,
    OPEN_CSV_MODAL,
    SEARCH_TABLE_CHANGE_EMP
} from "../../redux/actions";
import "./mp.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Mob1 from "./contents/mobs"
// import AddUserForm from "./modals/AddUserForm";
// import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
// import CsvModal from "./modals/CsvModal";
// import EditUserForm from "./modals/EditUserForm";
// import ViewUserModal from "./modals/ViewUserModal";

// import DownloadEmployees from "./contents/DownloadEmployees";
import SearchTable from "./contents/SearchTable";
import TableRecords from "./contents/TableRecords";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import MsgModal from "../../components/MsgModal";
// import LocalLoader from "../../components/LocalLoader";
//import OverdueList from "./contents/OverdueList";
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { EMPLOYEES_DATA_FETCHED } from "../../redux/actions";
import Checkbox from '@mui/material/Checkbox';



function Employees({  apiDash ,handleSearchChange,handleSearch,fn}) {
    let { total_employees } = apiDash;
    let [val ,setval]=useState("name")
    let [tot,setot]=useState(0)
    let [p,setp]=useState(3)
    let [page,setpage]=useState(1)
    let [val1,setval1]=useState("0")
    let  [ n1, setn1]=useState(false)
    let [n2,setn2]=useState(false)
    let [n3,setn3]=useState([])
    let [check,setcheck]=useState(false)
    let [text,settext]=useState("")
    let [h,seth]=useState(window.innerWidth)

    useEffect( ()=>{
    
        if(val=="status"){
            gp("1")
            return
        }
       
        if(val==="kyc"){
             dat("1")
            return 
        }
         handleSearch(val)
         handleSearchChange("",val)
 

    },[val])

    window.addEventListener("resize",()=>{
        seth(window.innerWidth)
    })

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
        e=parseInt(e)
        handleSearchChange(e,"status")


      }
    const notification= async ()=>{
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `${token}` },
        };
        var id=[]
        for (var i=0;i<n3.length;i++){
            id.push(n3[i][1])
        } 
        
        var body={
            "id":id,
            "title":"NOTIFICATION",
            "description":text
        }
      
        const response =await axios
        .post(`${process.env.REACT_APP_URL}/sales/push_notifications`,body,config ).catch((err)=>console.log(err))
    
      
    }
    
    
if(h>1000){
    return (
        <>
            <div className="employees"  >
            
            <div className="emp1">
                       <h1 style={{position:"relative",transform:"translateX(11px)"}}> {tot}  EMPLOYEES FOUND</h1>
                 
                       <div className="emp2"  >
                       <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                       <Checkbox size='large'  checked={check} onClick={()=>setcheck(!check)}> </Checkbox>
                       <div id="arrow" onClick={()=>setn1(!n1)} style={{cursor:"pointer"}}>
                       <ArrowDropDownIcon   fontSize='large'> </ArrowDropDownIcon>
                       </div>
                       </div>
                       <Popper   anchorEl={document.getElementById("arrow") } sx={{backgroundColor:"white",padding:"10px",boxShadow:"0px 3px 32px rgba(0, 0, 0, 0.12)",borderRadius:"5px"}}  open={n1}>
          
                       <div id="arrow1">
                        <MenuItem onClick={()=>{setn2(true)}} >PUSH NOTIFICATION</MenuItem>
                        </div>

                       </Popper>
                       <Menu  sx={{transform:"Translate(0px,-8px)",marginLeft:"15px"}} anchorEl={document.getElementById("arrow1") } anchorOrigin={{horizontal:"right"}}  open={n2}>
                    
<div style={{display:"flex",flexDirection:"column",padding:"20px",gap:"20px",alignItems:"center"}}>
<div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",width:"100%",cursor:"pointer"}}>
<ArrowBackIcon fontSize='large' onClick={()=>setn2(false)} ></ArrowBackIcon>
      </div> 
    <div style={{display:"flex",maxHeight:"200px",overflow:"scroll",flexDirection:"row",borderRadius:"5px",border:"1px solid  #1565C0",borderStyle:"dashed ",flexWrap:"wrap",width:"400px",gap:"5px",padding:"10px"}}>
        {n3.map((x)=><Chip  sx={{fontSize:"12px"}} label={<div style={{cursor:"pointer",display:"flex",gap:"4px",alignItems:"center"}}>{x[0]}<CancelIcon onClick={()=>setn3(n3.filter((y)=>y[1]!=x[1]))}> </CancelIcon></div>}></Chip>)}
    </div>
    <TextField rows={5} label="Notification" onChange={(x)=>settext(x.currentTarget.value)}  multiline size='large' sx={{width:"400px"}}  inputProps={{style: {fontSize: 15,padding:"8px"}}}  ></TextField>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",width:"100%",cursor:"pointer"}}>
      <SendIcon fontSize='large' onClick={()=>{setn2(false);setn1(false);notification();}}></SendIcon>
      </div> 

    

</div>                 
                   </Menu>
                    
                       <button className='header-btn' style={{border:p===3?" 2px solid #00C805":""}} onClick={(e)=>{setp(3);getAllEmployees()}} >ALL</button>
                       <button className='header-btn' style={{border:p===1?" 2px solid #00C805":""}} onClick={(e)=>{ setp(1) ;dat(1)}}>PENDING</button>
                       <button className='header-btn'  style={{border:p===2?" 2px solid #00C805":""}} onClick={(e)=>{ setp(2) ;dat(2)}} >COMPLETE</button>
                       <button className='header-btn'  style={{border:p===0?" 2px solid #00C805":""}} onClick={(e)=>{ setp(0) ;dat(0)}}>INCOMPLETE</button>
                       
                    
                       <div style={{position:"absolute",right:"31%",top:"7%"}}> 
                 
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
                           <div style={{position:"absolute",right:"15%",top:"8%"}}>
            
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
                <div className='employees-wrap'  >
                  
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
                        <TableRecords  check={check} n3={n3} setn3={setn3} setn2={setn2} val={val} tot={(e)=>setot(e)} currentPage={page} setCurrentPage={setpage}  />
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
            <div style={{display:"flex",flexDirection:"column",gap:"10px",color:"#00394d"}}>
            <h1 style={{position:"relative",transform:"translateX(20px)"}}>{tot} EMPLOYEES FOUND</h1>
                        <div style={{display:"flex",justifyContent:"space-between",gap:"70px"}}>
                       <Select value={val} onChange={(e)=>{setval(e.target.value)
                      
                
                       }}sx={{width:"150px",fontSize:"12px",transform:"translateX(20px)"}}  defaultValue={val} >
                               <MenuItem value="name" sx={{fontSize:"12px"}}>Employee Name</MenuItem>
                               <MenuItem value="email"  sx={{fontSize:"12px"}}>Email Id</MenuItem>
                               <MenuItem value="status"  sx={{fontSize:"12px"}}>Status</MenuItem>
                               <MenuItem value="kyc"  sx={{fontSize:"12px"}}>Kyc</MenuItem>
                              
                           </Select>
                           {val==="status"&&      <Select  onChange={(e)=>gp(e.target.value)} defaultValue={1} sx={{width:"130px",fontSize:"12px",transform:"translateX(-10px)"}}  >
                               <MenuItem value="0" sx={{fontSize:"12px"}}>Active</MenuItem>
                               <MenuItem value="1"  sx={{fontSize:"12px"}}>Inactive</MenuItem>
                               
                              
                           </Select>

                           } {val==="kyc"&&      <Select  onChange={(e)=>dat(e.target.value)} defaultValue={1} sx={{width:"130px",fontSize:"12px",transform:"translateX(-10px)"}}  >
                              
                       <MenuItem  value="1">Pending</MenuItem >
                       <MenuItem  value="2" >Complete</MenuItem >
                       <MenuItem  value="0" >Incomplete</MenuItem >
                               
                              
                           </Select>

                           }
                           </div>
                           </div>
                   
                      
               
            </div>
           
              
                    

                  
      <Mrecords  val={val} tot={(e)=>setot(e)} currentPage={page} setCurrentPage={setpage}></Mrecords>
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
        handleSearchChange: (search,type) => {
            dispatch({ type: SEARCH_TABLE_CHANGE_EMP, payload: { search ,type} });
          },
          handleSearch:(search)=>{
            dispatch({ type: "SEARCH_EMP", payload: { search} });
          }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
