import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
    DELETE_RECORD,
    EDIT_USER_OPEN,
    FILL_EDIT_FORM,
    OPEN_DELETE_DIALOGUE,
    OPEN_VIEW_USER_MODAL,
} from "../../../redux/actions";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SwitchUser from "./SwitchUser";
import SwitchButton from "./SwitchButton";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { SettingsVoice, Update } from "@mui/icons-material";
import Divider from '@mui/material/Divider';

const token = localStorage.getItem("token");

function ReadOnlyRows({
    record,
    up,
    check,
    v,
    handleOpenDeleteDialog,
    handleOpenViewModal,
    handleOpenEdit,}) {
    const { name, id, status, phone, accessible_credit, net_salary,kyc,email } = record;

   




    const [openAction, setOpenAction] = useState(false);
    const [ch,setch]=useState(false)
    const [mod,setmod]=useState(false)
   useMemo(()=>{
       
       if(check===true){
           setch(true)
       }if(check===false && ch===true){
           setch(false)
       }
   },[check])
   const handledit=async (e)=>{

       const token = localStorage.getItem("token");
       const config = {
         headers: { Authorization: `${token}` },
       };
       const body={
          
           kyc:e

       }
      const response =await axios
      .put(`${process.env.REACT_APP_URL}/sales/employee/${id}`,body,config ).catch((err)=>console.log(err))
      up(v+0.01)
    
    }
    const handledit1=async (e)=>{

        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `${token}` },
        };
        const body={
            
            status:e
 
        }
       const response =await axios
       .put(`${process.env.REACT_APP_URL}/sales/employee/${id}`,body,config ).catch((err)=>console.log(err))
       up(v+0.01)
       
     
     }

   

    return (
        <>
            <tr style={{height:"5px"}}>
              <div style={{position:"relative",display:"flex",flexDirection:"row",width:"100%",alignItems:"center",}}>
                <div className="check">
           
                    <Checkbox  size="large"  checked={ch} onClick={(e)=>setch(e.target.checked)} ></Checkbox>
               
              
                </div>
                <div style={{display:"flex",flexDirection:"row",minWidth:"20%",alignItems:"center",
               justifyContent:"center",height:"30px" ,position:"relative",left:"-5%"}}>
                    {name}
               
                  
              
               {/* <td>{id}</td> */}
               </div>



                {/* <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
                    {Company}
                </td> */}
                {/* <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
          {phone}
        </td> */}

                {/* <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
                    &#8377;{accessible_credit === null ? "0" : accessible_credit}
                </td> */}
             <td style={{position:"absolute",left:"25%"}}>
                 {phone}
                 </td>
                {/* <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
                    <div className="status-div">
                        <div className="switch-btn">
                            <SwitchButton status={status} id={id} net_salary={net_salary} />
                        </div>
                        <div className="switch-text">
                            <p
                                style={{ textTransform: "capitalize" }}
                                className={`${status.toLowerCase().trim() === "active"
                                    ? "active-status"
                                    : "inactive-status"
                                    }`}
                            >
                                <GoPrimitiveDot className="dot" />
                                {status}
                            </p>
                        </div>
                    </div>
                </td> */}
                <div style={{position:"absolute",left:"36%",minWidth:"20%",textAlign:"center"}}>
                    {email}
                </div>
                {/* <td>
                   {Aadhar}
                </td> */}
                {/* <td>
                    {pan}
                </td> */}
                  <div style={{position:"absolute",left:"60%",display:"flex",flexDirection:"row",minWidth:"5%",justifyContent:"center"}}>
                    {net_salary===undefined?"-":net_salary}
                </div>
                <td style={{position:"absolute",left:"70%"}}>
                    {status}
                </td>
                <td style={{position:"absolute",left:"80%"}}>
                    {kyc}
                </td>
              
                <td style={{position:"absolute",left:"98%",fontSize:"30px",zIndex:10,cursor:"pointer",top:"-4px"}} onClick={()=>{
                    setmod(!mod)
                }} >
       { mod&&<div className="ddot1">
                     
                      <div className="ddot4">
                     Set Status
                      </div>
                      <div className="ddot5">

                  { status==="active"&&<div className="dod"  onClick={(e)=>{handledit1(1)}}>Inactive</div>}
          
                  {status==="inactive"&&<div  className="dod" onClick={(e)=>{handledit1(0)}}>active</div>}

                      </div>
                      <div className="ddot6">
                         Set kyc
                      </div>
                   
                       
                      <div className="ddot55">
                    {  kyc==="incomplete"&&<div className="dod" onClick={(e)=>handledit(2)} > Completed</div> }
                 
                     { kyc==="complete" &&<div className="dod" onClick={(e)=>handledit(1)} >Incomplete</div>} </div> 

                     

                </div>}
                ...</td>
           
                {/* <td>
                    <div className="action-div">
                        {openAction &&
                            <div className="action-btn-div">
                                <div>
                                    <button
                                        onClick={handleOpenEdit}
                                        className="action-btns"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={handleOpenDeleteDialog}
                                        className="action-btns"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        }
                        <button onClick={handleOpenDeleteDialog}>
                                <MdDeleteOutline />
                            </button>
                            <button onClick={handleOpenEdit}>
                                <MdOutlineModeEdit />
                            </button>
                        <div className="options-btn">
                            <MoreHorizIcon onClick={() => setOpenAction(!openAction)} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </td> */}
      </div>
            </tr>
        </>
    );
}

//Redux
const mapStateToProps = (state) => {
    const { csvModalOpen } = state.recordReducer;
    return { csvModalOpen };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleOpenDeleteDialog: (e) => {
            e.preventDefault();
            const { record } = ownProps;
            const { id } = record;

            dispatch({ type: OPEN_DELETE_DIALOGUE, payload: { id } });
        },

        handleOpenViewModal: () => {
            const { record } = ownProps;
            const { id } = record;
            dispatch({ type: OPEN_VIEW_USER_MODAL, payload: { id } });
        },

        handleOpenEdit: () => {
            const { record } = ownProps;
            const { id } = record;

            dispatch({ type: EDIT_USER_OPEN, payload: { id } });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyRows);
