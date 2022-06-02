import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {
    DELETE_RECORD,
    EDIT_USER_OPEN,
    FILL_EDIT_FORM,
    OPEN_DELETE_DIALOGUE,
    OPEN_VIEW_USER_MODAL,
    SEARCH_TABLE_CHANGE
} from "../../../redux/actions";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SwitchUser from "./SwitchUser";
import SwitchButton from "./SwitchButton";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { Divider } from "@mui/material";
import {Select,MenuItem} from '@mui/material';


import axios from "axios";

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
const token = localStorage.getItem("token");

function ReadOnlyRowsT({
    record,
    check,
    handleOpenDeleteDialog,
    handleOpenViewModal,
    handleSearchChange,
    cur,
    v,
    handleOpenEdit,}) {
    const {  id, status, tranaction_type, ref_id, amount,date} = record;
    let sp="";
    if(status==="refund_settled"){
          sp="refund settled"
    }
    else if(status==="refund_initiated"){
        sp="refund initiated"

    }
    else{
       sp=status
    }
    // console.log(record);
    const rt=()=>{
        if(status==="initiated"){
            return 0
        }else if(status==="pending"){
            return 1
        }else if(status==="completed"){
            return 2
        }else if(status==="failed"){
            return 3
        }else if(status==="settled"){
            return 4
        }else if(status==="failed"){
            return 5
        }else if(status==="refund_settled"){
            return 7
        }else if(status==="refund_initiated"){
            return 6}
    }
    



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
   const upd=async (e)=>{
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    const body={
       status:e
    }
   const response =await axios
   .put(`${process.env.REACT_APP_URL}/sales/transaction/${id}`,body,config )
   .catch(err=>console.log(err))
   cur(v+0.01)
 
   

  

   }
   

    return (
        <>
            <tr style={{height:"5px"}}>
                <div className="name">
              
                <div className="check">
           
                    <Checkbox  size="large"  checked={ch} onClick={(e)=>setch(e.target.checked)} ></Checkbox>
               
                <div  className="name1">
                <td
                   
                    
         
                >
                    {id}
                </td>
                </div>
              
                </div>



                
                {/* <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
          {phone}
        </td> */}

                {/* <td onClick={handleOpenViewModal} style={{ cursor: "pointer" }}>
                    &#8377;{accessible_credit === null ? "0" : accessible_credit}
                </td> */}
           
                
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
                 
                <td style={{position:"absolute",left:"13%",textTransform:"capitalize"}}>
                {tranaction_type}
                </td>
                <div style={{position:"absolute",textAlign:"center",left:"19.4%",width:"20%"}}>

                    {ref_id===""?"-":ref_id}
                </div>

               

                <div style={{textAlign:"center",position:"absolute",left:"42.2%",width:"8%"}}>
                   { amount===null?"-":amount     }
                </div>

                <td  style={{position:"absolute",left:"56%",}}>
                   {date}

                </td>
              
                <td  style={{position:"absolute",left:"78%",textTransform:"capitalize"}}>
                 {sp}
                 </td>
               <div   className="per1" >
                <td onClick={()=>setmod(!mod)}  >
       { mod&&<div className="ddot12">
                   
                      <div className="ddot42">
                     Set Status
                      </div>
                      <div className="ddot52">

                            { status!=="initiated" &&<MenuItem value="0" onClick={(e)=>upd(0)} sx={{fontSize:"12px"}}>Initiated </MenuItem> }
                             { status!=="pending" &&<MenuItem value="1" onClick={(e)=>upd(1)}  sx={{fontSize:"12px"}}>Pending</MenuItem>}
                             { status!=="completed"&& <MenuItem value="2" onClick={(e)=>upd(2)}  sx={{fontSize:"12px"}}>Completed </MenuItem>}
                              { status!=="failed"&&<MenuItem value="3" onClick={(e)=>upd(3)}  sx={{fontSize:"12px"}}>Failed</MenuItem>}
                               { status!=="settled" && <MenuItem value="4" onClick={(e)=>upd(4)}  sx={{fontSize:"12px"}}>Settled </MenuItem>}
                               {status!=="refund initiated"&&<MenuItem value="5" onClick={(e)=>upd(5)}  sx={{fontSize:"12px"}}>Refund initiated</MenuItem>}
                             { status!="refund_settled" &&<MenuItem value="6" onClick={(e)=>upd(6)}  sx={{fontSize:"12px"}}>Refund Settled</MenuItem>}
                             
                      </div>
                   </div>}
                ...</td>
              </div>
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
        handleSearchChange: (search,type) => {
            dispatch({ type: SEARCH_TABLE_CHANGE, payload: { search:search,type:type } });
          },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyRowsT);
