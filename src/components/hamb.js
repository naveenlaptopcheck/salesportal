import "./ham.css"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useState } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Fab from '@mui/material/Fab';

const Hamb=()=>{
  let [x,setx]=useState(false)
  const log=()=>{
    localStorage.removeItem("token")
    window.location.replace("/")
  }
 
    return(
        <>
          <div className="n1">
          <div className="head">
           <h1>FINSIRE</h1>
          </div>
          <Drawer anchor="top" open={x}>
            <div  className="draw">
           <Fab size="small"  onClick={()=>setx(false)}  color="secondary">
<KeyboardBackspaceIcon onClick={()=>setx(false)} fontSize="large"></KeyboardBackspaceIcon>
           </Fab>
            <div className="w">
           
            <button  className="login-btn" onClick={()=>window.location.replace("/employees")}>Employees</button>

            </div>
            
            <div className="w">
            <button  className="login-btn" onClick={()=>window.location.replace("/transactions")}>Transactions</button>
</div>
          
             <div className="w" >
              <button  className="login-btn" onClick={()=>log()}>LOGOUT</button>
            </div>
           
            </div>
           
           
          </Drawer>
          <div className="menu">
        
    <MenuIcon fontSize="large" onClick={()=>{setx(true)}}></MenuIcon>
          </div>
          </div>


        </>
    )
}
export default Hamb;