import  { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormData } from "../../interface/interface";
import {Alert ,RegisterFormStyle} from "./LoginStyle"

const apiUrl = import.meta.env.VITE_BASE_URL;



const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/users/login`,
        data
      );

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1 });

        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/erp/Products");
        }, 1500);
      } else {
        console.error("Login failed");
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An unexpected error occurred during login.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setLoginError(null);
  };
  
  return (
    <Box
      style={{
        backgroundImage:
          'url("https://assets-discuss-neos-io.s3.dualstack.eu-central-1.amazonaws.com/original/2X/6/665c28e208724e2280dd9520eee68b45665743ed.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "20px",
          }}
        >
          <Typography variant="h4">Login</Typography>
          <Box
            component="form"
            style={RegisterFormStyle}
            onSubmit={handleSubmit(handleLogin)}
          >
            <TextField
              id="username"
              label="Username"
              type="text"
              {...register("username")}
              fullWidth
              margin="normal"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} // Adjust alpha for transparency
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              {...register("password")}
              fullWidth
              margin="normal"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} // Adjust alpha for transparency
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "rgba(128, 128, 128, 0.7)", // Adjust alpha for transparency
                color: "white",
              }}
              variant="contained"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                navigate("/erp/Sign_up");
              }}
              sx={{
                backgroundColor: "rgba(128, 128, 128, 0.7)", // Adjust alpha for transparency
                color: "white",
              }}
              variant="contained"
            >
              Sign Up
            </Button>
            <Snackbar
              open={open || !!loginError}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={loginError ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {loginError
                  ? loginError
                  : "Login successful! Redirecting to Products..."}
              </Alert>
            </Snackbar>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;