import "./ham.css"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
const Hamb=({ handleSearchChange,search })=>{
  let [x,setx]=useState(false)
  let [e1,sete1]=useState(false)
  let [p,setp]=useState(false)

  
  const log=()=>{
    localStorage.removeItem("token")
    window.location.replace("/")
  }
  const drt=(e)=>{
    if(e.clientX>225){
      setx(false)
    }
  
   }
 
  const token = localStorage.getItem("token");
  useEffect(()=>{
    handleSearchChange("","")
    

  },[e1])
  const config = {
    headers: { Authorization: `${token}` },
  
  };
useEffect(()=>{
  if(e1===true){
    setTimeout(()=>document.getElementById("ty").classList.toggle("active"),100)

  }
},[e1])
 
    return(
      <>
      {e1===false? (
          <div className="n1">
         
            
          <div className="menu" >
  
        
          <div className="rg">

<svg className="ham ham2"  viewBox="0 0 100 100" width="40" height="40" id="tk" onClick={()=>{
  setx(true)
}}>
  <path
        className="line top"
        d="m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381" />
  <path
        className="line middle"
        d="m 30,50 h 40" />
  <path
        className="line bottom"
        d="m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381" />
</svg>


        </div>       
        <h1 style={{color:"#00394d"}}>FINSIRE</h1>
        
              </div>
              
        
      
              <SearchIcon fontSize="large" sx={{color:"#00394d"}} onClick={()=>{sete1(true);}}></SearchIcon>
              
           
        
          {/* <input type="text" style={{outline:"none",border:"none", color:"black",}} placeholder={"search"}></input> */}
          <Drawer anchor="left" open={x}   onClick={drt} onTouchMove={()=>setx(false)}>
            <div  className="draw">
          
             <div className="heading1">
             <h1>FINSIRE</h1>
             </div>
             <div className="box1" onClick={()=>window.location.replace("/transactions")} >
             <div className="log2"  >
             <PaidIcon  sx={{color:"white",fontSize:"20px"}}></PaidIcon>
              <a  href="/transactions" className="ll1" style={{color:"white"}}>Transactions</a>
             </div>
             </div>
             <div className="box1"  onClick={()=>window.location.replace("/employees")} style={{backgroundColor:"white",borderTopRightRadius:"15px",borderBottomRightRadius:"15px"}}>
             <div className="log2">
              <PeopleIcon fontSize="large" sx={{color:"#00394d",fontSize:"20px"}} ></PeopleIcon>
              <a  href="/employees" className="ll1" style={{color:"#00394d"}} >Employees</a>
             </div>
             </div>
          
             <div className="box1" onClick={log}>
             <div className="log2">
             <LogoutIcon sx={{color:"white",fontSize:"20px"}} ></LogoutIcon>
           
              <h2 onClick={log}  className="ll1">Logout</h2>
             </div>
             </div>
            
           
            </div>
            
          </Drawer>
        
          </div>):(
            <div className="n2">
            <div className="rg">

<svg class="ham ham2" viewBox="0 0 100 100" width="50" height="50" id="ty" onClick={()=>{
  sete1(false)
}}>
  <path
        class="line top"
        d="m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381" />
  <path
        class="line middle"
        d="m 30,50 h 40" />
  <path
        class="line bottom"
        d="m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381" />
</svg>


        </div>  
                   <input type="text"  onChange={(e) => {
            setp(true)
            let search1 = e.target.value;
            handleSearchChange(search1,search);
          
            // handleSearchChange(search);
          }} style={{outline:"none",border:"none", color:"black",}} placeholder={"search"}></input>
        
                     </div>
          )}
          </>
    )
  
}
const mapStateToProps = (state) => {
  const {search } = state.recordReducer;

  return { search};
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchChange: (search,type) => {
      dispatch({ type: "SEARCH_TABLE_CHANGE_EMP", payload: { search ,type} });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hamb);
