import React, {useState} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface FormData {
  username: string;
  password: string;
}

const RegisterFormStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(to right bottom, #ffffff, #f0f0f0)",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();
  const [open, setOpen] = useState(false);

  const handleLogin = async (data: FormData) => {
    try {
      const response = await axios.post(
        "https://erp-beak1-6.onrender.com/api/users/login",
        data
      );

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1 });

        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/Products");
        }, 1500);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "20px",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
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
                    inputProps={register("username")}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    {...register("password")}
                    fullWidth
                    margin="normal"
                    inputProps={register("password")}
                  />
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "grey",
                      color: "white",
                    }}
                    variant="contained"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("./Sign_up");
                    }}
                    type="submit"
                    sx={{
                      backgroundColor: "grey",
                      color: "white",
                    }}
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Login successful! Redirecting to Products...
                    </Alert>
                  </Snackbar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Login;
