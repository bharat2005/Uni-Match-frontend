import { Box, Button, Typography } from "@mui/material";

const WeChatConsultation = () => {
  const styles = {
    container: {
      borderRadius: "40px",
      bgcolor: "white",
      display: "flex",
      maxWidth: "640px",
      px: "40px",
      py: "40px",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
      whiteSpace: "nowrap",
      textAlign: "center",
      justifyContent: "center",
      "@media (max-width: 991px)": {
        px: "20px",
        whiteSpace: "initial",
      },
      "@media (max-width: 640px)": {
        maxWidth: "577px",
        mb: "156px",
      },
    },
    title: {
      color: "rgba(42, 23, 39, 1)",
      fontSize: "40px",
      fontWeight: 600,
    },
    textContainer: {
      display: "flex",
      mt: "32px",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "26px",
      color: "rgba(143, 139, 142, 1)",
      fontWeight: 400,
      lineHeight: 2,
      justifyContent: "center",
      "@media (max-width: 991px)": {
        maxWidth: "100%",
        whiteSpace: "initial",
      },
    },
    contactInfo: {
      mt: "8px",
      "@media (max-width: 991px)": {
        maxWidth: "100%",
      },
    },
    qrCode: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "400px",
      mt: "32px",
      maxWidth: "100%",
      overflow: "hidden",
    },
    button: {
      borderRadius: "50px",
      alignSelf: "stretch",
      mt: "32px",
      minHeight: "100px",
      width: "100%",
      px: "40px",
      gap: "10px",
      fontSize: "32px",
      color: "white",
      fontWeight: 550,
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ff4785 100%)",
      boxShadow: "0 4px 15px rgba(255, 107, 107, 0.2)",
      "&:hover": {
        background: "linear-gradient(135deg, #ff4785 0%, #ff6b6b 100%)",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 20px rgba(255, 107, 107, 0.3)",
      },
      "&:active": {
        transform: "translateY(1px)",
      },
      "@media (max-width: 991px)": {
        maxWidth: "100%",
        px: "20px",
        whiteSpace: "initial",
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>添加微信，预约服务</Typography>

      <Box sx={styles.textContainer}>
        <Typography
          component="div"
          sx={{ fontSize: "inherit", color: "inherit", fontWeight: "inherit" }}
        >
          长按识别二维码添加微信咨询
        </Typography>
        <Typography
          component="div"
          sx={{
            ...styles.contactInfo,
            fontSize: "inherit",
            color: "inherit",
            fontWeight: "inherit",
          }}
        >
          我们将竭诚为您服务(咨询热线:18988556644)
        </Typography>
      </Box>

      <Box
        component="img"
        src="https://cdn.builder.io/api/v1/image/assets/7a5b27b98c3f4eebbf70ca6beb4aac6d/824b9ee11f6c9c3913856194b0b5afb5cdc15e9e9f783910cddde88165f6cf6e?placeholderIfAbsent=true"
        sx={styles.qrCode}
        alt="WeChat QR Code"
      />

      <Button sx={styles.button} variant="contained" disableRipple>
        知道了
      </Button>
    </Box>
  );
};

export default WeChatConsultation;
