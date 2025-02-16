import React, { useState } from "react";
import { Card, CardContent, Typography, Avatar, Box, Chip, Modal } from "@mui/material";
import LogoutModal from './LogoutModal';
import { PencilIcon, ShareIcon ,InformationCircleIcon , ArrowLeftStartOnRectangleIcon, CurrencyRupeeIcon, TrashIcon} from '@heroicons/react/24/solid';

const ProfileSection = ({ profile, handleOptionClick, user_id}) => {
    const [open, setOpen] = useState(false)
    const [supportOpen, setSupportOpen] = useState(false)
    const [selected, setSelected] = useState('')

function handleLogoutClick(option){
    if (option === 'Logout'){
        setOpen(true)
        setSelected('logout')
    } else if (option === 'Delete Account'){
        setOpen(true)
        setSelected('del')
    }
}
function handleSupportClick(){
  setSupportOpen(true)
}



  return (
    <>
    <Modal open={supportOpen} onClose={()=>setSupportOpen(false)}>
  <Box
       sx={{
          position: "relative",
          backgroundColor: "white",
          border:'2px solid black',
          width: "250px",
          height: "300px",
          borderRadius: "8px",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundImage:'url(/signs/qr.png)',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
       }}
     >
     </Box>
  </Modal>


      <LogoutModal open={open} onClose={() => setOpen(false)} selected={selected} user_id={user_id} />
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
              src={profile.images[0]}
              sx={{
                width: 120,
                height: 120,
                bgcolor: "primary.main",
                fontSize: 32,
                mb: 1,
                border: "4px solid black",
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {profile.name}, {profile.age}
            </Typography>
            <br />
            <Typography variant="body1" color="text.secondary">
              12413923
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
              onClick={handleSupportClick}
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
              onClick={() => handleLogoutClick("Delete Account")}
              sx={{ color: "tomato", border: "1px solid black",  width:'45%', height:32 }}
            />
            </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileSection;
