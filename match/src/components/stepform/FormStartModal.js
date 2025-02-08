import React, {useState} from "react"; 
import { Box, Typography, Modal, Button } from "@mui/material";


export default function FormStartModal(){
    const [openModal, setOpenModal] = useState(true);

    return (
        <Modal open={openModal}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "12%",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
            Let’s Set You Up!
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "center" }}>
            <br/>We’re excited to help you find meaningful connections!<br />
            <br />
            <strong>Reminder:</strong> The details you provide here will be used
            to create your profile and will help us recommend the perfect matches
            for you. 🌈<br />
            <br />
            Please fill them out truthfully! 💛<br />
            <br />
          </Typography>

          <Button
            mt={5}
            variant="contained"
            onClick={()=> setOpenModal(false)}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ffbf00",
              color: "black",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#ffbf00" },
            }}
          >
            Let's go
          </Button>

        </Box>
      </Modal>
    )
}