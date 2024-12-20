import React, { useEffect } from 'react';
import { CssBaseline, Grid2 } from '@mui/material';
import Typography from '@mui/material/Typography';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem'
import SideMenu from './passwords-page/SideMenu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Header from './components/Header';
import MainContent from './passwords-page/mainContent';
import { useState } from 'react';

const PWContainer = styled(Stack)(({ theme }) => ({
  '&::before': {
    content: '""',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        // 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        'radial-gradient(at 50% 50%, hsla(110, 5%, 4%, 0.8), hsl(100, 3%, 3%))',
    }),
  },
}));


export default function PasswordsPage(props) {

  const [addMode, setAddMode] = useState(false);

  const handleAddClick = () => {
    setAddMode(!addMode);
  }

  useEffect(() => {
    // Add class to body
    document.body.classList.add('custom-justify');

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('custom-justify');
    };
  }, []);


  return (
    <AppTheme {...props}>
      <CssBaseline  />
      <PWContainer>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            alignItems:'center',
            marginLeft: '-16px',
          }}
        >
          <SideMenu/>
          <Divider orientation='vertical'/>
          <Box
              component="main"
              // direction="column"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                p: 0,
                height: '100vh',
                // backgroundImage: 'radial-gradient(at 50% 50%, hsla(110, 5%, 4%, 0.8), hsl(100, 3%, 3%))',
              }}
            >
            <Header onAddClick={handleAddClick} />
            <MainContent addMode={addMode} setAddMode={setAddMode} />
          </Box>
        </Stack>
      </PWContainer>
    </AppTheme>
  );
}

