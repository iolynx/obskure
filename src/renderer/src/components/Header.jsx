import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Search from './Search';
import TitleBar from './TitleBar'
import { IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { Divider } from '@mui/material';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: 'calc(100vw - 234px)',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
        pr: 1.5,
        paddingLeft: '0px',
        paddingBottom: 1.5,
        borderBottom: '1px solid',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
      spacing={2}
    >
      <Stack direction="row" sx={{ gap: 5.8}}>
        <TitleBar />

        <IconButton aria-label='plus' size='small'>
          <AddRoundedIcon />
        </IconButton>
        <Search />
      </Stack>


      <Stack direction="row" sx={{ gap: 1 }}>
        <ColorModeSelect />
      </Stack>

    </Stack>
  );
}
