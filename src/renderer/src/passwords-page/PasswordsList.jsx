import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { Paper, List, IconButton } from '@mui/material';
import {CircularProgress} from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ListItemButton from '@mui/material/ListItemButton';
import { ContentCopy } from '@mui/icons-material';


const drawerWidth = 240;

export default function PasswordsList({ onPasswordSelect }) {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleSelect = (index, password) => {
    setSelectedIndex(index);
    console.log(selectedIndex);
    onPasswordSelect(password)
  }

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
  }


  useEffect(() => {
    // Fetch passwords when the component mounts
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
      } finally {
        setLoading(false); // Set loading to false after fetch is done
      }
    };

    fetchPasswords();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }


  return (
    <Paper
      sx = {{
        height: '100%',
        overflow: 'visible',
        p: 2,
        boxShadow: 3,
        flex: 1, // Allow it to stretch in the flex container
        width: '100%'
      }}
    >

      {error ? (
        <p sx={{ color: 'red' }}> {error} </p>
      ) : (
        <List
          direction="row"
          sx={{
            p: 0,
            gap: 1,
            alignItems: 'center',
            maxWidth: '100%',
            // borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >

          {passwords.map((password, index) => (
            <>
            <ListItem
              key={index}
              button={true}
              sx={{
                justifyContent: 'space-between',
                pr: 1,
                pl: 1,
                backgroundColor: selectedIndex === index ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                transition: 'background-color 0.2s',
                // padding: '8px 16px'
              }}
              onClick={() => handleSelect(index, password)}
            >
              <Stack direction="column" spacing={-2}>
                <Typography variant="body1" display="block" sx={{ fontWeight: 500, lineHeight: '16px',}}>
                  {password.service}<br/>
                </Typography>
                <br/>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {password.username}
                </Typography>
              </Stack>
              <Box>
                <IconButton aria-label='copy' size='small'
                  onClick={(e) => {e.stopPropagation(); handleCopy(password.password)}} >
                  <ContentCopyRoundedIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider width='110%' />
            </>
          ))}
        </List>
      )}
    </Paper>
  );
}
