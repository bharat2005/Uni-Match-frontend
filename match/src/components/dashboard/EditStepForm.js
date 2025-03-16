import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Name from './stepform/Name';
import { MobileStepper } from "@mui/material";
import Images from './stepform/Images';
import Reasonnn from './stepform/Reason';
import Bio from './stepform/Bio';
import Interestt from './stepform/Interests';
import Persona from './stepform/Personality';
import Done from './stepform/Done';
import axios from 'axios';
import Stepper from '../../OldComp/Stepper';
import SmallLoading from '../login/SmallLoading'
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { fontSize } from "@mui/system";




const InputDesign = ({onClose}) => {
    const [step, setStep] = useState(0);
    const [doneShow, setDoneShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState( { reg_no: '12413928', reason: 'Casual dating', age: 23, name: 'Bharat',personality:'Extrovert', images: [null, '/10.avif', '/4.avif', '/5.jpg', null], bio:'Im the solo developer of this whole Uni-Match platform...😎', interests:["Gardening", "Paragliding","Puzzles"] });
    const [images, setImages] = useState(Array(6).fill(null));


  function handleDone() {
    setLoading(true)
    console.log(formData)
    axios.post('https://api.uni-match.in/profile', formData, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
      .then(response => {
        setLoading(false)
        
        console.log("Message from server: ", response.data);
      })
      .catch(error => {
        setLoading(false)
        setDoneShow(true)
        console.error("Error: ", error);
      });
  }



  const styles = {
    appContainer: {
      background: "linear-gradient(135deg, #ffe6e6, #e6f0ff)",
      position: "fixed", // Cover entire screen
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999, // Ensure it's above other components
      overflowY: "auto", // Allow scrolling if needed
      display: "flex",
      flexDirection: "column",
      //justifyContent: "center",
      alignItems: "center",
      fontFamily: '"Noto Sans SC", sans-serif',
    },
    backButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      position: "absolute",
      //display: step !== 0 ? "block" : "none",
      top: "20px",
      left: "20px",
      minWidth: "auto",
      padding: 0,
      color: "#000",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      padding: "16px",
      gap: "12px",
      maxWidth: "400px", // Limit max width for better UX
    },
    title: {
      fontSize: { xs: "20px", sm: "24px" },
      fontWeight: 500,
      color: "#000",
    },
    subtitle: {
      fontSize: { xs: "14px", sm: "16px" },
      color: "#666",
    },
    inputContainer: {
      width: "80%",
      maxWidth: "300px",
      margin: "30px 0 50px 0",
      "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
        backgroundColor: "#fff",
        "& fieldset": {
          borderColor: "#ddd",
        },
      },
      "& .MuiInputBase-input": {
        textAlign: "center",
        fontSize: { xs: "14px", sm: "16px" },
        padding: "12px 16px",
      },
    },
    nextButton: {
      color: "#fff",
      padding: "12px 0",
      width: "80%",
      maxWidth: "300px",
      borderRadius: "25px",
      fontSize: { xs: "14px", sm: "16px" },
      textTransform: "none",
      backgroundColor: "#ff69b4",
      "&:hover": {
        backgroundColor: "#ff50a7",
      },
    },
    progressContainer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      padding: { xs: "16px", sm: "20px" },
    },
    progressText: {
      fontSize: "14px",
      color: "#333",
      marginBottom: "8px",
    },
    progressBar: {
      height: "4px",
      borderRadius: "2px",
      backgroundColor: "#e0e0e0",
      "& .MuiLinearProgress-bar": {
        backgroundColor: "#ff69b4",
      },
    },
    progressNote: {
      fontSize: "12px",
      color: "#B9B8F5",
      marginTop: "8px",
    },
  };

  if (doneShow){
    return <Done/>
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
       {loading && <SmallLoading/>}
      <Box sx={styles.appContainer} >

        <Button onClick={step == 0 ? onClose : () => {setStep(prev=> prev-1)}} sx={styles.backButton}>
          <ChevronLeftIcon  style={{fontSize:'28px'}}/>
        </Button>

                     {step === 0 && <Name setStep={setStep} formData={formData} setFormData={setFormData} />}
                     {step === 1 && <Images images={images} setImages={setImages} setStep={setStep} formData={formData} setFormData={setFormData}/>}
                     {step === 2 && <Reasonnn setStep={setStep} formData={formData} setFormData={setFormData} />}
                     {step === 3 && <Bio setStep={setStep} formData={formData} setFormData={setFormData} />}
                     {step === 4 && <Interestt setStep={setStep} formData={formData} setFormData={setFormData} />}
                     {step === 5 && <Persona  handleDone={handleDone} formData={formData} setFormData={setFormData} />}


                     <Box
  sx={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: { xs: "16px", sm: "20px" },
  }}
>
  {/* Step text and stepper in a single row */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "8px",
    }}
  >
    <Typography
      sx={{
        fontSize: "14px",
        color: "#333",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      Steps ({step}/5)
    </Typography>

    {/* Stepper */}
    <Box sx={{ flexGrow: 1 }}>
      <MobileStepper
        sx={{
          "&.MuiPaper-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: "0px",
          },
          "& .MuiLinearProgress-root": {
             width: "100%",
            backgroundColor: "lightgrey", // Soft background color
            height: "8px", // Increase height for a more noticeable bar
            borderRadius: "20px", // Round edges for the stepper track
            overflow: "hidden", // Ensure the rounding applies to inner content
            "& .MuiLinearProgress-bar": {
              backgroundImage: "linear-gradient(90deg, #ff69b4, #8b5cf6)",
              borderRadius: "20px", // Round edges for the progress bar
            },
          },
         // Let it fill the parent width naturally
        }}
        variant="progress"
        steps={6}
        position="static"
        activeStep={step}
      />
    </Box>
  </Box>

  {/* Info text below */}
  <Typography
    sx={{
      fontSize: "12px",
      color: "#B9B8F5",
      marginTop: "8px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <InformationCircleIcon
      style={{
        width: "2.5em",
        height: "2.5em",
        color: "#7270F5",
        marginRight: "4px",
      }}
    />
    To help build a sincere community, please ensure that all information you provide is accurate and honest.
  </Typography>
</Box>


    </Box>


    </>
  );
};

export default InputDesign;
