import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import { useState } from "react"
import { BsSnow3 } from 'react-icons/bs';
export default function CHECK({check,s3,s4,emp,id}){

    const [s,sets]=useState(false)
useEffect(()=>{
  if(check===true){
    if(s===false){
      sets(true);
      
    }
  }else{
    sets(false)
  }
 
},[check])   
useEffect(()=>{
  if(s===true){
   var s1=s4.filter((x)=>x[1]==id)
   if(s1.length==0){
    sets(false)
   }
  }
},[s4])   
    return (
        <Checkbox size="large"   checked={s}  onClick={()=>{
         if(s===false){
          sets(true)   
          s3([...s4,[emp,id]]) 
         }else{
          sets(false)
          s3(s4.filter((x)=>x[1]!=id))
         }
        }}></Checkbox>
    )
}