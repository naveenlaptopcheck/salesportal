
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
export default function Modal1({ data,change}){
  const {id,
  name,
  phone,
  aadhar,
  pan_card,
  net_salary,
  accessible_credit,
  account_holder_name,
  account_number,
  kyc,
  status,
  ifsc,
  company_name,dob,
  nbfc_name,
  upi,
  email}=data
console.log(data)
    return (<>
   
    <div style={{width:"90%",height:"95%",overflow:"hidden",backgroundColor:"white",}} >
    <h1 className="view-user-head">Employee Information</h1>
      <div className="view-underline"></div>
      <div className="view-form" style={{overflowY:"scroll",height:"80%"}}>
        <div className="view-user-form">
          <div className="first-form-col" style={{flexDirection:"row",gap:"90px"}}>
            <div className="add-user-category">
              <h1 >Personnel Information</h1>
              <p >
                This inf ormation is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap" style={{display:"flex",flexDirection:"row",width:"1000px"}}>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Employee Name</h3>
                <br></br>
                <p>{name}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>DOB</h3>
                <br></br>
                <p  style={{color:dob===null ?"red":"black"}}>{dob===null?'not available':dob}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Phone</h3>
                <br></br>
                <p>{phone}</p>
              </div>
             
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Email</h3>
                <br></br>
                
               
                <p style={{color:email===null || email===undefined?"red":"black"}}>{email===null || email===undefined?"email not available":email}</p>
              </div>
              <div className="view-control" >
                <h3 style={{fontWeight:"bolder"}}>Aadhar</h3>
                <br></br>
                <p style={{color:aadhar===null || aadhar===undefined?"red":"black"}}>{aadhar===null || aadhar===undefined?"Aadhar not available" :aadhar}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Pan ID</h3>
                                <br></br>

                <p style={{color:pan_card===null || pan_card===undefined?"red":"black"}}>{pan_card===null || pan_card===undefined?"pan card not available" :pan_card}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Kyc status  </h3>
                                <br></br>

                <p>{kyc}</p>
              </div>
            </div>
          </div>
          <div className="add-underline"></div>
          <div className="first-form-col"  style={{flexDirection:"row",gap:"90px"}}>
            <div className="add-user-category">
              <h1>Company  Information</h1>
              <p>
                This information is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap" style={{display:"flex",flexDirection:"row",width:"1000px"}}>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Company Name</h3>
                <br></br>
                <p>{company_name}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}} >NBFC Name</h3>
                <br></br>
                <p >  {nbfc_name}</p>
              </div>
            </div>
          </div>
          <div className="add-underline"></div>

          <div className="first-form-col"  style={{flexDirection:"row",gap:"90px"}}>
            <div className="add-user-category" >
              <h1  >Bank Details</h1>
              <p>
                This information is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap" style={{display:"flex",flexDirection:"row",width:"1000px"}}>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Account Holder Name</h3>
                <br></br>
                <p>{account_holder_name}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Account Number</h3>
                <br></br>
                <p>{account_number}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>IFSC</h3>
                <p>{ifsc}</p>
              </div>
            </div>
          </div>
          <div className="add-underline"></div>
          <div className="first-form-col"  style={{flexDirection:"row",gap:"90px"}}>
            <div className="add-user-category">
              <h1>Salary Information</h1>
              <p>
                This information is used to add the employee <br />
                details in our database. Thus it wouldn't be shared outside.
              </p>
            </div>
            <div className="view-control-wrap" style={{display:"flex",flexDirection:"row",width:"1000px"}}>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}}>Accessible Credit</h3>
                <br></br>
                <p> &#x20B9; {accessible_credit}</p>
              </div>
              <div className="view-control">
                <h3 style={{fontWeight:"bolder"}} >Net Salary</h3>
                <br></br>
                <p > &#x20B9; {net_salary}</p>
              </div>
            </div>
          </div>
          <div className="add-underline"></div>

          
        </div>
        
      
         
        
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",width:"90%"}}> 
      <Button variant='contained' onClick={()=>change()}>Close</Button>
      </div>
      </div>
      
    </>)
}