import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MyStepper from './stepform/MyStepper';
import UserForm from './stepform/UserForm';
import ImagePickerCard from './stepform/ImagePickerCard';
import Reason from './stepform/Reason';
import Interest from './stepform/Interest';
import Personality from './stepform/Personality';




export default function StepForm(){
  const [step, setStep] = useState(0);


  return (

    <Box sx={{display:'flex', width:'100vw',height:'100vh', alignItems:'center',justifyContent:'center', backgroundColor:'#ffbf00'}}>


    <Box sx={{ width: "640px", height:'100%', textAlign: "center",backgroundColor:'white', display:'flex', flexDirection:'column',justifyContent:'space-between' }}>

      <Box>

        {step === 0 && (
         <UserForm/>
        )}

        {step === 1 && (
           <ImagePickerCard/>
        )}

        {step === 2 && (
             <Reason/>
        )}

        {step === 3 && (
            <Interest/>
        )}   

        {step === 4 && (
            <Personality/>
        )}

      </Box>

    <MyStepper step={step} setStep={setStep}/>

    </Box>



    </Box>
  )
}