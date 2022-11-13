import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
export default function At({status,id,v,cur}){
    let [m,setm]=useState(false)
    let [ac,setac]=useState(null)
    const rt=(e)=>{
        setac(e.target)
        setm(!m)
    }
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
       console.log(response)
       cur(v+0.01)
     
       
    
      
    
       }



  
  // console.log(record);

    return (
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",cursor:"pointer"}} onClick={rt}>
        <SettingsApplicationsIcon sx={{fontSize:"30px"}}></SettingsApplicationsIcon>
        <Menu
      
          anchorEl={ac}
  
        
          open={m}
          
        sx={{borderRadius:"50%",cursor:"pointer"}}
        >
          <div style={{width:"200px",color:"#00394d",minHeight:"250px",paddingTop:"10px",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
                    <div style={{justifyContent:"flex-start",transform:"translateX(-20px)"}}>
                     <h2 >Set Status</h2>
                     </div>
          <div className="ddot52" style={{borderTop:"1px solid #00394d"}}>

{ status!=="initiated" &&<MenuItem value="0" onClick={(e)=>upd(0)} sx={{fontSize:"12px"}}>Initiated </MenuItem> }
 { status!=="pending" &&<MenuItem value="1" onClick={(e)=>upd(1)}  sx={{fontSize:"12px"}}>Pending</MenuItem>}
 { status!=="completed"&& <MenuItem value="2" onClick={(e)=>upd(2)}  sx={{fontSize:"12px"}}>Completed </MenuItem>}
  { status!=="failed"&&<MenuItem value="3" onClick={(e)=>upd(3)}  sx={{fontSize:"12px"}}>Failed</MenuItem>}
   { status!=="settled" && <MenuItem value="4" onClick={(e)=>upd(4)}  sx={{fontSize:"12px"}}>Settled </MenuItem>}
   {status!=="refund_initiated"&&<MenuItem value="5" onClick={(e)=>upd(5)}  sx={{fontSize:"12px"}}>Refund initiated</MenuItem>}
 { status!="refund_settled" &&<MenuItem value="6" onClick={(e)=>upd(6)}  sx={{fontSize:"12px"}}>Refund Settled</MenuItem>}
 
</div>

                    

               
          </div>
        </Menu>
        </div>
    )
}