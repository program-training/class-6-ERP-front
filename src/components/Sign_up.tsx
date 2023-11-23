import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import {Box}from "@mui/material"



const RegisterFormStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(to right bottom, #f5f5f5, #e0e0e0)", // Light gray background
};
const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#3399FF", // Light blue color
  color: "white",
};

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleRegistration = async (data: FormData) => {
    const { password, confirmPassword } = data;
    console.log(data);

    // בדיקת עמיתות סיסמה
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      // שליחת בקשה לשרת עם נתונים בפורמט JSON
      const response = await axios.post(
        "http://localhost:8200/api/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.user);
      console.log(response.data.message);

      if (response.data.user) {
        // רישום מוצלח
        console.log("Registration successful");
        navigate("/");
      } else {
        // רישום נכשל
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box component ="form"
              style={RegisterFormStyle}
              onSubmit={handleSubmit(handleRegistration)}
            >
              <FormControl>
                <InputLabel htmlFor="email">Enter Your Email</InputLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("username", { required: "Email is required" })}
                />
                {errors.username && (
                  <FormHelperText error>
                    {errors.username.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <FormHelperText error>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="confirmPassword">
                  Password Confirmation
                </InputLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Password confirmation is required",
                  })}
                />
                {errors.confirmPassword && (
                  <FormHelperText error>
                    {errors.confirmPassword.message}
                  </FormHelperText>
                )}
              </FormControl>

              <Button type="submit" variant="contained" style={ButtonStyle}>
                Sign Up
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignUp;
