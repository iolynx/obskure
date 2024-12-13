import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';

export default function PasswordInfo({ password }) {
  return (
    <Box
      sx={{
        flex: 1, // Allow it to stretch in the flex container
        height: '100%', // Occupy full height
        width:'295px',
        pt: 3,
        pl: 3,
        overflow:'hidden'
      }}
    >
      {password ? (
        <>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {password.service}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Username:</strong> <br/>
          </Typography>
          <Typography variant="h6" color="textTertiary">
              {password.username}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Password:</strong> <br/>
          </Typography>
          <Typography variant="h6" color="textTertiary">
            {password.password}
          </Typography>

        </>
      ) : (

        <Typography variant="body1">
          Select an account to get started.
        </Typography>

      )}
    </Box>
  );
}
