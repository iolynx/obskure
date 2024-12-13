import { TextField, Input } from "@mui/material";
import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CustomSnackBar from '../components/CustomSnackbar';

export default function PasswordEntry() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newPassword, setNewPassword] = useState({
    service: '',
    username: '',
    password: '',
    other: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('New Password Entry:', newPassword);
  };

  const handleSubmit = (event) => {
    handleSave();
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    window.electronAPI.savePassword(newPassword).then((response) => {
      if(response.success) {
        setSnackbarMessage("Password saved successfully");
        setSnackbarOpen(true);
      }
      else{
        setSnackbarMessage("Error: Could not save Password");
        setSnackbarOpen(true);
        console.log(response.error);
      }
    });
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (

    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        flex: 1, // Allow it to stretch in the flex container
        height: '100%', // Occupy full height
        pt: 3,
        pl: 3,
        pr: 3,
        overflow:'hidden',
      }}
    >

      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        Add a new Password
      </Typography>

      <TextField
        name="service"
        placeholder="Service Name"
        value={newPassword.service}
        onChange={handleChange}
        margin="normal"
        sx={{
          mt:3,
          ml:1,
        }}
      />

      <Box
        sx={{
          height: '20px'
        }}>
      </Box>

      {/* <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Website URL:</strong> <br />
      </Typography> */}

      <LanguageRoundedIcon sx={{position:'relative', top:'6px'}} />

      <Input
        label="URL"
        placeholder="Website URL"
        name="other"
        value={newPassword.other}
        onChange={handleChange}
        margin="normal"
        sx={{
          transformOrigin:3,
          ml:1
        }}
      />
      <br/>
      <br/>


      {/* <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Username:</strong> <br />
      </Typography> */}

      <AccountCircleRoundedIcon  sx={{position:'relative', top:'7px'}}/>
      <Input
        label="Username"
        placeholder="Username"
        name="username"
        value={newPassword.username}
        onChange={handleChange}
        margin="normal"
        sx={{
          ml:1
        }}
      />


      <br/><br/>
      {/* <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Password:</strong> <br />
      </Typography> */}

      <LockOpenRoundedIcon sx={{position:'relative', top:'7px'}} />
      <Input
        label="Password"
        name="password"
        placeholder="Password"
        value={newPassword.password}
        onChange={handleChange}
        type="password"
        margin="normal"
        sx={{
          ml:1
        }}
      />
      <br/><br/>

    <Button type="submit" variant="outlined" onClick={handleSave} sx={{ mt: 2 }}>
      Save
    </Button>
    <CustomSnackBar
      snackbarOpen={snackbarOpen}
      snackbarMessage={snackbarMessage}
      onClose={handleCloseSnackbar}
    />
  </Box>
  );
}
