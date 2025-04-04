"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import SmallLoading from "./SmallLoading";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import ErrorModal from './ErrorModal';
import InvalidModal from './InvalidModal';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, bool, setBool2 } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [lpuLogin, setLpuLogin] = useState({ regNo: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (
      lpuLogin["regNo"].length == 8 &&
      lpuLogin["password"].length > 0 &&
      isChecked == true
    ) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [lpuLogin["regNo"], lpuLogin["password"], isChecked]);

  function handleLoginSubmit(e) {
    setLoading(true);
    e.preventDefault();
    axios
      .post("https://api.uni-match.in/login", lpuLogin, {
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        if (response.data.message == "Login") {
          const csrfTokenAccess = response.headers["x-csrf-token-access"];
          localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

          const csrfTokenRefresh = response.headers["x-csrf-token-refresh"];
          localStorage.setItem("csrfTokenRefresh", csrfTokenRefresh);

          if (response.data.nbool) {
            login(true);
            navigate("/app/home");
          } else {
            localStorage.setItem("login", "halfLogin");
            setBool2(true);
            navigate("/profile-setup");
          }
        } else {
          response.data.message == "Invalid credentials" ? setInvalid(true) : setError(true)
        }
      })
      .catch((error) => {
        console.error(error);
        setError(true)
        setLoading(false);
        login(false);
      });
  }

  return (<>

  
<ErrorModal
        error={error}
        setError={setError}
      />

<InvalidModal
        invalid={invalid}
        setInvalid={setInvalid}
      />

    <Box
      sx={{
        background:
          "linear-gradient(32.33deg, #FEEDFB 40.6%, #FEE5EC 58.42%, #F5E6FF 79.81%, #BFEAFF 100%)",
        height: "95dvh",
        overflow: "hidden",
        padding: "20px",
        fontFamily: '"Inter", sans-serif',
        position: "relative",
      }}
    >


      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />

      {loading && <SmallLoading />}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
          padding: { xs: "20px 10px", md: "40px 20px" },
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <i
            className="ti ti-clover-filled"
            style={{
              fontSize: "36px",
              background:
                "linear-gradient(145deg, #ff3c78 0%, #ff79b0 30%, #b985ff 70%, #5caeff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "background 0.3s ease-in-out",
            }}
          />
          <img src="/Uni-match-14-3-2025.png" style={{ width: "85%" }} />
          
        </Box>
        
        <Box sx={{textAlign:'right'}}>
        <img src="/beta.png" style={{ width: "15%", position:'relative', left:10 }} />
        </Box>
        

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img src="/sub.png" style={{ width: "40%" }} />
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: { xs: "20px", md: "30px" },
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "25px", md: "28px" },
            color: "#ff69b4",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Login with LPU
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField
            fullWidth
            placeholder="registeration number"
            value={lpuLogin["regNo"]}
            onChange={(e) =>
              setLpuLogin((prev) => ({ ...prev, regNo: e.target.value }))
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: " #e0e0e0",
                },
                "&:hover fieldset": {
                  borderColor: "#ccc", // Slightly darker on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff6b9c", // Different color on focus
                },
              },
            }}
          />

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            value={lpuLogin["password"]}
            onChange={(e) =>
              setLpuLogin((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "#e0e0e0",
                },
                "&:hover fieldset": {
                  borderColor: "#ccc", // Slightly darker on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff6b9c", // Different color on focus
                },
              },
            }}
          />

          <a
          //onClick={()=> window.open("https://ums.lpu.in/lpuums/forgetpassword.aspx")}
          onClick={()=> setError(true)}
            style={{
              color: "#ff69b4",
              alignSelf: "flex-end",
              textTransform: "none",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Forget password?
          </a>

          <Button
            fullWidth
            onClick={handleLoginSubmit}
            disabled={!isReady}
            sx={{
              backgroundColor: isReady ? "#ff69b4" : "#fed8e6",
              color: "white !important",
              borderRadius: "10px",
              marginTop: "10px",
              padding: { xs: "12px", md: "15px" },
              fontSize: "16px",
              "&:hover": {
                backgroundColor: isReady ? "#ff69b4" : "#fed8e6",
              },
            }}
          >
            LOGIN
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              sx={{
                color: "#ff69b4",
                "&.Mui-checked": {
                  color: "#ff69b4",
                },
              }}
            />
            <Typography sx={{ fontSize: "12px", color: "#666" }}>
              I agree to <a onClick={()=> navigate('/terms-conditions')} style={{ color: "#ff69b4" }}>Terms & </a> &{" "}
              <a onClick={()=> navigate('/privacy-policy')}  style={{ color: "#ff69b4" }}>Privacy Policy.</a>
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
 </> );
};

export default LoginPage;
