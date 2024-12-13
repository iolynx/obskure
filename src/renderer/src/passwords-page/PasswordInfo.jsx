import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import { IconButton  } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { Snackbar, Alert, Button } from '@mui/material';
import { useState } from 'react';

export default function PasswordInfo({ password }) {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password.password)
    .then(() => {
      setSnackbarMessage('Password copied to clipboard!');
      setSnackbarOpen(true);
    })
    .catch((err) => {
      console.error('Failed to copy password: ', err);
      setSnackbarMessage('Failed to copy password');
      setSnackbarOpen(true);
    });
  }

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(password.username)
    .then(() => {
      setSnackbarMessage('Username copied to clipboard!');
      setSnackbarOpen(true);
    })
    .catch((err) => {
      console.error('Failed to copy Username: ', err);
      setSnackbarMessage('Failed to copy Username');
      setSnackbarOpen(true);
    });
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        flex: 1, // Allow it to stretch in the flex container
        height: '100%', // Occupy full height
        pt: 3,
        pl: 3,
        pr: 3,
        overflow:'hidden',
      }}
    >
      {password ? (
        <>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {password.service}
          </Typography>

          <Box
          sx={{
            height:'20px'
          }}>
          </Box>

          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Website URL:</strong> <br/>
          </Typography>

          <a href={'https://' + password.other} target="_blank" rel="noopener noreferrer">
            <Typography button variant="h5" color='lightblue'>
              <u>{password.other}</u>
            </Typography>
          </a>

          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Username:</strong> <br/>
          </Typography>
          <Typography variant="h6" color="textTertiary"
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }} >
              {password.username}
              <IconButton aria-label='copy' size='small' sx={{ml:3}} onClick={handleCopyUsername}>
                <ContentCopyRoundedIcon />
              </IconButton>
          </Typography>

          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Password:</strong> <br/>
          </Typography>
          <Typography variant="h6" color="textTertiary"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }} >
            {showPassword ? password.password : "••••••••••"}
              <Box>
                <IconButton aria-label='view-password' size='small' onClick={handleTogglePassword}>
                  {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                </IconButton>
                <IconButton aria-label='copy' size='small' sx={{ml:1}} onClick={handleCopyPassword}>
                  <ContentCopyRoundedIcon />
                </IconButton>
              </Box>
          </Typography>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1400}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

        </>
      ) : (

        <Typography variant="body1">
          Select an account to get started.
        </Typography>

      )}
    </Box>
  );
}
