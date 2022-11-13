import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { Button } from "@mui/material";
export default function At({status,id,kyc,v,up}){
    let [m,setm]=useState(false)
    let [ac,setac]=useState(null)
    const rt=(e)=>{
        setac(e.target)
        setm(!m)
    }
    const handledit=async (e)=>{

        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `${token}` },
        };
        if(kyc==="complete"){
            var c=0
        }else{
            var c=2
        }
        const body={
           
            kyc:c
 
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
         if(status==="active"){
            var c=1
        }else{
            var c=0
        }
         const body={
             
             status:c
  
         }
        const response =await axios
        .put(`${process.env.REACT_APP_URL}/sales/employee/${id}`,body,config ).catch((err)=>console.log(err))
        up(v+0.01)
        
      
      }
 
    return (
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",cursor:"pointer"}} onClick={rt}>
        <SettingsApplicationsIcon sx={{fontSize:"30px"}}></SettingsApplicationsIcon>
        <Menu
      
          anchorEl={ac}
          
          open={m}
          
        sx={{borderRadius:"50%",cursor:"pointer"}}
        >
          <div style={{width:"150px",color:"#00394d",height:"100px",paddingTop:"10px",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
    
                     
               <div id="status" >
                    <h2>Set Status</h2>
                    <div className="ry" onClick={handledit1} style={{borderTop:"1px solid #00394d",width:"100px",textAlign:"center",color:"#00394d"}}>
                       {status==="active"?<h3>Inactive</h3>:<h3>Active</h3>}
                    </div>

               </div>
               <div id="kyc">
               <h2>Set Kyc</h2>
                    <div className="ry" onClick={handledit}  style={{borderTop:"1px solid #00394d",width:"100px",textAlign:"center",color:"#00394d"}}>
                       {kyc==="complete"?<h3>Incomplete</h3>:<h3>complete</h3>}
                    </div>
               </div>

                    

               
          </div>
        </Menu>
        </div>
    )
}