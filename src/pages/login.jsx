import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Typography>Email Address</Typography>
        <TextField
          fullWidth
          value={inputFields.email}
          onChange={handleFieldsChange}
          name="email"
          autoFocus
        />
        <Typography mt="20px">Password</Typography>
        <TextField
          value={inputFields.password}
          fullWidth
          name="password"
          type="password"
          onChange={handleFieldsChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 6, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
