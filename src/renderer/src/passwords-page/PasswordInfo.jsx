import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';

export default function PasswordInfo() {
  return (
    <Box
      sx={{
        flex: 1, // Allow it to stretch in the flex container
        width: '100%', // Occupy full width
        height: '100%', // Occupy full height
        overflow:'hidden'
      }}
    >
      <Typography>
        this is some passwords info
      </Typography>
    </Box>
  );
}
