import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

const EditProfileComingSoon = ({ setBool }) => {
  return (
    <Card
    sx={{
      maxWidth: 600,
      margin: "0px auto",
      padding: 0,
      boxShadow:'none',
      backgroundColor: "#f9f9f9",
      height: "80vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <ChevronLeftIcon
        style={{ width: "24px", height: "24px", cursor: "pointer" }}
        onClick={()=>setBool(0)}
      />
      <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft: "16px" }}>
            Edit Profile
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="body1" color="text.secondary"mt={'60%'} paragraph>
            We're working hard to bring you this feature! Stay tuned for updates. 🚀
          </Typography>
        </Box>
    </Card>
  );
};

export default EditProfileComingSoon;
