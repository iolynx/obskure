import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PasswordInfo from './PasswordInfo';
import PasswordsList from './PasswordsList';
import { Divider } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { useRef } from 'react';


export default function MainContent(){

  const [selectedPassword, setSelectedPassword] = useState(null);

  const handlePasswordSelect = (password) => {
    setSelectedPassword(password);
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
        <PasswordsList onPasswordSelect={handlePasswordSelect} />
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden',
        }}
      >
        <PasswordInfo password={selectedPassword} />
      </Box>

    </Box>
  );
}
