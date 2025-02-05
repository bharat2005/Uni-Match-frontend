import React, {useContext} from "react";
import {MobileStepper, Button,} from "@mui/material";
import {AuthContext} from '../../AuthProvider';
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoneIcon from '@mui/icons-material/Done';


export default function MyStepper({step,setStep}){
    //const {profileSetup} = useContext(AuthContext);
    //const navigate = useNavigate();

    function handleNextClick(){
        if(step<7){
            setStep(prev=>prev+1)}
        //  } else{
        //      profileSetup(true)
        //     navigate("/dashboard", { replace: true } )
        //  }
    }

    return (
        <MobileStepper
        variant="progress"
        sx={{marginBottom:'0px'}}
        steps={8}
        position="static"
        activeStep={step}
        nextButton={
        <Button variant="contained" sx={{color:'#ffbf00', backgroundColor:'black', borderRadius:'50px',boxShadow:'none',"&:hover":{backgroundColor:'black'}}} size="small"  onClick={handleNextClick}>
            {step==7?<DoneIcon/>:<ArrowForwardIosIcon/>}
              
        </Button>
        }
        backButton={
        <Button variant="contained" sx={{color:'#ffbf00',backgroundColor:'black', borderRadius:'50px',boxShadow:'none',"&:hover":{backgroundColor:'black'}}} size="small" onClick={()=>setStep(prev=>prev-1)} disabled={step === 0}>
          
            <ArrowBackIosNewIcon/>
        </Button>
        }
        sx={{
            "& .MuiLinearProgress-root": {
              backgroundColor: "#ffbf00", 
              "& .MuiLinearProgress-bar": {
                backgroundColor: "black",
              },
            },
          }}
        />
    )
}