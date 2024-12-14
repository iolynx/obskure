import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Snackbar, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import PasswordInfo from './PasswordInfo';
import PasswordsList from './PasswordsList';
import PasswordEntry from './PasswordEntry';

export default function MainContent({ addMode, setAddMode }){

  const [passwords, setPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const result = await window.electronAPI.getPasswords();
        if (result.error) {
          console.log(result.error);
          setError(result.error);
        } else {
          setPasswords(result);
        }
      } catch (err) {
        console.error('Error fetching passwords:', err);
        setError('An unexpected error occurred.');
      }
    };
    fetchPasswords();
  }, []);

  const handlePasswordSelect = (password) => {
    setSelectedPassword(password);
    setAddMode(false);
  };


  const handlePasswordDelete = async (password) => {
    const result = await window.electronAPI.deletePassword(password)
    if (result.success){
      setSnackbarMessage('Record Deleted Successfully');
      setSnackbarOpen(true);
      setPasswords(result.remainingEntries);
      setSelectedPassword(0);
    }
    else {
      console.error('Failed to delete Record: ', result.error);
      setSnackbarMessage('Failed to delete Record');
      setSnackbarOpen(true);
    }
  }

  const handlePasswordAddition = async (newPassword) => {
    window.electronAPI.savePassword(newPassword).then((response) => {
      if(response.success) {
        setSnackbarMessage("Password saved successfully");
        setSnackbarOpen(true);
        setPasswords(response.newPasswords);
        setAddMode(false);
        setSelectedPassword(0);
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


  return(
    <Box sx={{
      maxWidth: { sm: '100%', md: '100%'},
      overflow:'auto',
      display: 'flex',
    }}
    >
      <Box
        sx={{
          flex: '1 1 auto',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: '#8897b3 #121212',
          borderRight: '2px solid',
          borderColor: 'divider',
          maxWidth: '300px',
          width: '300px'
        }}
      >
        <PasswordsList passwords={passwords} onPasswordSelect={handlePasswordSelect} error={error} />
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden',
        }}
      >
        {addMode ? (
          <PasswordEntry onAddition={handlePasswordAddition} />
        ) : (
          <PasswordInfo password={selectedPassword} onDelete={handlePasswordDelete} />
        )}
      </Box>

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

    </Box>
  );
}
