import React, {useState} from "react";
import { Card, CardContent, Typography, Box, Button, Modal } from "@mui/material";
import { ChevronLeftIcon,  TrashIcon} from "@heroicons/react/24/solid";
import DeleteAccountModal from './DeleteAccountModal';

function DeleteAccount({setBool, user_id}){
    const [open, setOpen] = useState(false)


    function handleSupportClick(){
        setOpen(true)
      }
      

  return (

<>

<DeleteAccountModal open={open} onClose={()=>setOpen(false)} user_id={user_id}/>


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
          Delete Account
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
              Deleting your account is a permanent action and cannot be undone. 
              If you choose to proceed, all your data will be permanently erased.
            </Typography>
            <Typography variant="body1" paragraph>
              If you’re sure about this, click the button below to confirm your account deletion.
            </Typography>
               <Button
                   variant="contained"
                   color="error"
                   onClick={handleSupportClick}
                   sx={{ mt: 2}}
                   
                 ><TrashIcon/>
                   Delete My Account
                 </Button>
        </Box>
      </CardContent>
    </Card>
    </>
  );
};

export default DeleteAccount;