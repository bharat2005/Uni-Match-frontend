import React, { useState } from "react";
import { Card, CardContent, Typography, Avatar, Box, Chip } from "@mui/material";
import LogoutModal from './LogoutModal';
import { PencilIcon, ShareIcon ,InformationCircleIcon , ArrowLeftStartOnRectangleIcon, CurrencyRupeeIcon} from '@heroicons/react/24/solid';

const ProfileSection = ({ profile, handleOptionClick}) => {
    const [open, setOpen] = useState(false)
function handleLogoutClick(option){
    if (option === 'Logout'){
        setOpen(true)
    }
}
  return (
    <>
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
              sx={{ color: "black", border: "1px solid black", width:'50%', height:40 }}
            />

            <Chip
              icon={<ShareIcon style={{ color: "black", width:'13%' }} />}
              label="Share"
              onClick={() => handleOptionClick("Share")}
              sx={{ color: "black", border: "1px solid black",  width:'50%', height:40 }}
            />

            <Chip
              icon={<InformationCircleIcon style={{ color: "black", width:'13%' }} />}
              label="About Developer"
              onClick={() => handleOptionClick("About Us")}
              sx={{ color: "black", border: "1px solid black",  width:'50%', height:40 }}
            />

            <Chip
              icon={<CurrencyRupeeIcon style={{ color: "black", width:'13%' }} />}
              label="Support Us"
              onClick={() => handleOptionClick("Support Us")}
              sx={{ color: "black", border: "1px solid black",  width:'50%', height:40 }}
            />

            <Chip
              icon={<ArrowLeftStartOnRectangleIcon style={{ color: "black", width:'13%' }} />}
              label="Logout"
              onClick={() => handleLogoutClick("Logout")}
              sx={{ color: "black", border: "1px solid black",  width:'50%', height:40 }}
            />
            </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileSection;
