import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { ChevronLeftIcon, CurrencyRupeeIcon } from "@heroicons/react/24/solid";

const SupportUs = ({ setBool }) => {
  const [supportOpen, setSupportOpen] = useState(false);

  function handleSupportClick() {
    setSupportOpen(true);
  }

  return (
    <>
      <Modal open={supportOpen} onClose={() => setSupportOpen(false)}>
        <Box
          sx={{
            position: "relative",
            backgroundColor: "white",
            border: "2px solid black",
            width: "250px",
            height: "250px",
            borderRadius: "8px",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundImage: "url(/signs/qr.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Modal>

      <Card
        sx={{
          maxWidth: 600,
          margin: "0px auto",
          padding: 0,
          boxShadow: "none",
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
            onClick={() => setBool(0)}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginLeft: "16px" }}
          >
            Support Us
          </Typography>
        </Box>
        <CardContent
          sx={{
            overflowY: "auto",
            padding: 3,
            flexGrow: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box mb={3}>
            <Typography variant="body1" paragraph>
              As a student developer, creating and maintaining{" "}
              <strong>Uni-Match</strong> has been an incredible journey filled
              with challenges and growth.
            </Typography>
            <Typography variant="body1" paragraph>
              This app was built with love and dedication, and I’m committed to
              making it better every day for our LPU community. If you
              appreciate the effort behind this platform, you can show your
              support by donating.
            </Typography>
            <Typography variant="body1" paragraph>
              Your contributions will help me:
            </Typography>
            <ul>
              <li style={{ marginBottom: "8px" }}>
                Keep the app running smoothly
              </li>
              <li style={{ marginBottom: "8px" }}>Add exciting new features</li>
              <li style={{ marginBottom: "8px" }}>
                Cover maintenance and server costs
              </li>
            </ul>
            <Typography variant="body1" paragraph>
              Every bit counts and helps me continue to bring value to our
              amazing community. Thank you for your generosity and belief in my
              work! 🙌
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSupportClick}
            >
              <CurrencyRupeeIcon />
              Support Us
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SupportUs;
