// import * as React from 'react';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'

function Confirmation({ open, handleClose, title, content, onConfirm }) {
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
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault()
          handleClose()
        },
        sx: { backgroundImage: 'none' }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" type="submit" onClick={handleConfirm}>
          Yes
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

Confirmation.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default Confirmation
