import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography"; 

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8200/api/users/login",
        data,
      );
      console.log(response);

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/Products");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
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
                <Typography variant="h4">
                  Login
                </Typography>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <TextField
                    id="username"
                    label="Username"
                    type="text"
                    {...register("username")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    {...register("password")}
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("./Sign_up");
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Login;
