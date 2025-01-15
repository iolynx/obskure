// import * as React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Autocomplete, TextField, List } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: '#0d0d0d',
  border: '2px solid #303746',
  borderRadius: '12px',
  maxHeight: '200px', // Limit the height if necessary
  minHeight: '100px',
  overflowY: 'scroll',
  '& .MuiAutocomplete-option': {
    fontSize: '14px',
    padding: '12px',
    '&:hover': {
      backgroundColor: '#161a23'
    },
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.action.selected
    }
  }
}))

// eslint-disable-next-line react/prop-types
function SearchDialog({ open, handleClose, title, content, onConfirm, passwords }) {
  const [selectedValue, setSelectedValue] = useState(null)

  const handleSelectionChange = (event, newValue) => {
    setSelectedValue(newValue)
  }

  const handleConfirm = () => {
    onConfirm(true)
    handleClose()
  }

  const handleCancel = () => {
    onConfirm(false)
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      scroll="body"
      maxWidth="max-width"
      fullWidth="false"
      sx={{ '& .MuiDialog-paper': { width: '30%', maxHeight: 435 } }}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault()
          handleClose()
        },
        sx: { backgroundImage: 'none' }
      }}
    >
      <DialogTitle>Search Passwords</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          height: '300px'
        }}
      >
        <Autocomplete
          freeSolo
          disablePortal
          options={passwords}
          getOptionLabel={(option) => option.label}
          value={selectedValue}
          onChange={handleSelectionChange}
          placeholder="test"
          sx={{
            width: 300,
            '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
              '&:hover': {
                backgroundColor: '#161a23'
              },
              // backgroundColor: '#0d0d0d'  alternate backgroudn
              backgroundColor: '#121212'
            },
            '& + .MuiAutocomplete-popper': {
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'thin',
              border: '2px solid #303746',
              borderRadius: '10px',
              scrollbarColor: '#8897b3 #121212'
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: null // Removes the clear "x" button
              }}
              autoFocus
              placeholder="Search"
              margin="normal"
              sx={{ mt: 1 }}
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" type="submit" onClick={handleConfirm}>
          Go
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

SearchDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default SearchDialog
