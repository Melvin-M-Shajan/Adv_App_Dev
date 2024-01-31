/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as Defpath, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";
import image1 from "./loginbg.avif";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
}

const theme = createTheme();

export default function Signup1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Add state for the role

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (role === "user") {
      // Navigate to "/" for user
      navigate("/");
    } else if (role === "admin") {
      // Navigate to "/login" for admin
      navigate("/admin");
    } else {
      // Display warning for incorrect value
      alert("Please enter correct values");
      return;
    }

    // Rest of the code remains unchanged
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:8080/auth/login", data);
    localStorage.setItem("email", data.email);

    let token = response.data.jwtToken;
    localStorage.setItem("token", token);
    dispatch(
      login({
        email: data.email,
        loggedIn: true,
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image1})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative", // Add this to position the text over the image
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{
                color: "#ffff", // Customize text color
                position: "absolute",
                top: "250px", // Adjust as needed
                left: "40%", // Adjust as needed
                transform: "translate(-50%, -50%)", // Center the text
              }}
            >
              <b>SeniorCare</b>
              <br></br>
              <br></br>
              <b> YOUR COMPLETE IN-HOME CARE SOLUTION</b>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "blue", width: 80, height: 80 }} />
            <Typography component="h1" variant="h5">
              login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="UserName"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="role"
                label="User / Admin / Company"
                type="text"
                id="role"
                autoComplete="current-password"
                onChange={(e) => setRole(e.target.value)} // Update role state
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Defpath to="/forgotpassword">
                    Forgot password?
                    </Defpath>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    <Defpath to="/login">{"Don't have an account? Register"}</Defpath>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
