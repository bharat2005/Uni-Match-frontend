import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Chip, Avatar, Modal, IconButton } from "@mui/material";
import LogoutModal from './LogoutModal';
import { PencilIcon, ShareIcon ,InformationCircleIcon , ArrowLeftStartOnRectangleIcon, CurrencyRupeeIcon, TrashIcon} from '@heroicons/react/24/solid';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const ProfileSection = ({ lpuselfprofile, profile, handleOptionClick}) => {
    const [open, setOpen] = useState(false)
    const [openx, setOpenx] = useState(false)
    const [selected, setSelected] = useState({})
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

function handleLogoutClick(option){
    if (option === 'Logout'){
        setOpen(true)
    }
}

function emoji(){
  switch (selected.reason){
    case "Casual Dating":
      return "🎉"
    case "Short-term fun":
      return "😍"
    case "Long-term relationship":
      return "💘"
    case "New friends":
      return "👋"
    case "Study buddy":
      return "📚"
    case "Still figuring it out":
      return "🤔"
  }}

  let list = []
  if (selected.images){
  list = selected.images.filter(item => item!=null)}
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
  };


if (!(lpuselfprofile && profile)){
  return <p>Loading.....</p>
}


  return (
    <>


<Modal open={openx} onClose={()=>setOpenx(false)}>
  <Box
       sx={{
          position: "relative",
          backgroundColor: "white",
          border:'2px solid black',
          width: "315px",
          height: "450px",
          boxShadow: "inset 0px -20px 40px 0px black",
          borderRadius: "8px",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundImage: `url(${list[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
       }}
     >
       
       <IconButton
         sx={{ position: "absolute", left: "10px", color: "white" }}
         onPointerDown={prevImage}
       >
         <ArrowBackIos />
       </IconButton>
 
 
       <IconButton
         sx={{ position: "absolute", right: "10px", color: "white" }}
         onPointerDown={nextImage}
       >
         <ArrowForwardIos />
       </IconButton>

       <Typography
         variant="h6"
         sx={{
           position: "absolute",
           bottom: "35px",
           left: "15px",
           fontWeight: "bold",
           fontSize: "25px",
           color: "white",
         }}
       >
         {selected.name}, {selected.age}
       </Typography>
       <Typography
         variant="body1"
         sx={{
           position: "absolute",
           bottom: "15px",
           left: "12px",
           fontSize: "15px",
           color: "white",
         }}
       >
         {emoji()}{selected.reason}
       </Typography>
     </Box>
  </Modal>

      <LogoutModal open={open} onClose={() => setOpen(false)} />

      <Card
        sx={{
          width: "100%",
          margin: "20px auto",
          borderRadius: 2,
          boxShadow: "none",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar
            onClick={()=> {setSelected(profile); setOpenx(true)}}
              src={lpuselfprofile.image}
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
                fontSize: 32,
                mb: 1,
                border: "4px solid #fd7e14",
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {lpuselfprofile.name}
            </Typography>
            <br />
            <Typography variant="body1" color="text.secondary">
              {lpuselfprofile.reg_no}
            </Typography><br/>
          </Box>

          <Box display="flex" gap={3} justifyContent="center" alignItems={'center'} flexDirection={'column'} mt={2}>
            <Chip
              icon={<PencilIcon style={{ color: "black", width:'13%' }} />}
              label="Edit Profile"
              onClick={() => handleOptionClick("Edit Profile")}
              sx={{ color: "black", border: "1px solid black", width:'45%', height:32 }}
            />

            <Chip
              icon={<ShareIcon style={{ color: "black", width:'13%' }} />}
              label="Share"
              onClick={() => handleOptionClick("Share")}
              sx={{ color: "black", border: "1px solid black",  width:'45%', height:32 }}
            />

            <Chip
              icon={<InformationCircleIcon style={{ color: "black", width:'13%' }} />}
              label="About Developer"
              onClick={() => handleOptionClick("About Us")}
              sx={{ color: "black", border: "1px solid black",  width:'45%', height:32 }}
            />

            <Chip
              icon={<CurrencyRupeeIcon style={{ color: "black", width:'13%' }} />}
              label="Support Us"
              onClick={()=> handleOptionClick("Support Us")}
              sx={{ color: "black", border: "1px solid black",  width:'45%', height:32 }}
            />

            <Chip
              icon={<ArrowLeftStartOnRectangleIcon style={{ color: "black", width:'13%' }} />}
              label="Logout"
              onClick={() => handleLogoutClick("Logout")}
              sx={{ color: "black", border: "1px solid black",  width:'45%', height:32 }}
            />

            <Chip
              icon={<TrashIcon style={{ color: "black", width:'13%' }} />}
              label="Delete Account"
              onClick={() => handleOptionClick("Delete Account")}
              sx={{ color: "tomato", border: "1px solid black",  width:'45%', height:32 }}
            />
            </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileSection;
