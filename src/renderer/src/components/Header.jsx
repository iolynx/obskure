import * as React from 'react'
import Stack from '@mui/material/Stack'
import TitleBar from './TitleBar'
import { IconButton, Tooltip, Button, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ColorModeSelect from '../shared-theme/ColorModeSelect'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useSearchDialog from './useSearchDialog'

export default function Header({ onAddClick, curFolder }) {
  const { showDialog, SearchDialogComponent } = useSearchDialog()

  const openSearchDialog = async () => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    await showDialog()
  }

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
        borderColor: 'divider'
      }}
      spacing={2}
    >
      <Stack direction="row" sx={{ gap: 5.8 }}>
        <TitleBar curFolder={curFolder} />

        <Tooltip title="Add New Record">
          <IconButton aria-label="plus" size="small" onClick={onAddClick}>
            <AddRoundedIcon />
          </IconButton>
        </Tooltip>
        <Button variant="outlined" onClick={openSearchDialog}>
          <SearchRoundedIcon fontSize="small" />
          &nbsp;
          <Typography sx={{ pr: 1, pl: 0 }}>Search</Typography>
          <Typography
            variant="caption"
            sx={{ pl: 1, pr: 1, borderRadius: '5px', backgroundColor: 'rgb(30, 41, 59)' }}
          >
            Ctrl+K
          </Typography>
        </Button>
      </Stack>

      <Stack direction="row" sx={{ gap: 1 }}>
        <ColorModeSelect />
      </Stack>

      {SearchDialogComponent}
    </Stack>
  )
}
