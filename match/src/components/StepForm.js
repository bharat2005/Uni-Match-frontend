import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MyStepper from './stepform/MyStepper';
import UserForm from './stepform/UserForm';
import ImagePickerCard from './stepform/ImagePickerCard';
import Reason from './stepform/Reason';
import Interest from './stepform/Interest';
import Bio from './stepform/Bio';
import Personality from './stepform/Personality';
import Pets from './stepform/Pets';
import StarSign from './stepform/StarSign';



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
            <Box sx={{display:'flex', justifyContent:'center'}}>
           <ImagePickerCard/>
           </Box>
        )}

        {step === 2 && (
             <Reason/>
        )}

        {step === 3 && (
            <Interest/>
        )}   

        {step === 4 && (
            <Bio/>
        )}

        {step === 5 && (
            <Personality/>
        )}

        {step === 6 && (
            <StarSign/>
        )}

        {step === 7 && (
                <Pets/>
        )}

      </Box>

    <MyStepper step={step} setStep={setStep}/>

    </Box>



    </Box>
  )
}