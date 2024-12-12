import React, { useEffect } from 'react';
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


  return(
    <Box sx={{ width:'100vh', maxWidth: { sm: '100vh', md: '100vh'}, overflow:'visible'}}>
      <Grid2
        container
        spacing={0}
        columns={12}
        sx={{
          '--Grid-borderWidth': '2px',
          borderColor: 'divider',
          '& > div': {
            borderWidth:'6px',
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        <Grid2 size={{xs: 12, sm: 5}} sx={{overflow:'auto'}}>
          <PasswordsList />
        </Grid2>
        <Grid2 size={{xs: 12, sm: 7}} sx={{overflow:'hidden', height:'200px'}}>
          <PasswordInfo />
        </Grid2>

      </Grid2>
    </Box>
  );
}
