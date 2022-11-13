
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Transactions from '../Transactions';
export default function Modal1({ data,change}){
  const {id,amount,date,ref_id,status,tranaction_type
  }=data

    return (<>
   
    <div style={{width:"90%",height:"90%",overflow:"hidden",backgroundColor:"white"}} >
    <h1 className="view-user-head">Transaction Information</h1>
      <div className="view-underline"></div>
      <div className="view-form">
        <div className="view-user-form">
          <div className="first-form-col" style={{flexDirection:"row",gap:"90px"}}>
            <div className="add-user-category">
              <h1 >Transaction Information</h1>
              <p >
                This information is used to keep track of transaction
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap" style={{display:"flex",flexDirection:"row",width:"1000px"}}>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Transaction ID</h3>
                <br></br>
                <p>{id}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Reference ID</h3>
                <br></br>
                <p>{ref_id}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Date</h3>
                <br></br>
                
               
                <p style={{color:date===null || date===undefined?"red":"black"}}>{date===null || date===undefined?"date not available":date}</p>
              </div>
             
             
            </div>
          </div>
          <div className="add-underline"></div>
         
          <div className="first-form-col"  style={{flexDirection:"row",gap:"90px"}}>
            <div className="add-user-category">
              <h1>Amount Information</h1>
              <p>
                This information is used to keep Track of transactions
                details in our database.Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap" style={{display:"flex",flexDirection:"row",width:"1000px"}}>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Amount</h3>
                <br></br>
                <p> &#x20B9; {amount}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}} >Transaction Type</h3>
                <br></br>
                <p > {tranaction_type}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}} >Transaction Status</h3>
                <br></br>
                <p > {status}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="add-underline"></div>
      
         
        
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",width:"90%",marginTop:"30px"}}> 
      <Button variant='contained' onClick={()=>change()}>Close</Button>
      </div>
      </div>
      
    </>)
}