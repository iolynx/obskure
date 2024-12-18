// import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from 'react-select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Autocomplete, TextField } from '@mui/material';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function SearchDialog({ open, handleClose, title, content, onConfirm}) {

  const handleConfirm = () => {
    onConfirm(true);
    handleClose();
  }

  const handleCancel = () => {
    onConfirm(false);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      scroll='body'
      maxWidth='max-width'
      fullWidth='false'
      sx={{ '& .MuiDialog-paper': { width: '30%', maxHeight: 435 } }}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Search Passwords</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', gap: 2, width: '100%', height:'300px'}}
      >
          <Autocomplete
            freeSolo
            disablePortal
            options={options}
            placeholder="test"
            sx={{ width: 300, }}
            renderInput={(params) => <TextField {...params} autoFocus placeholder="Search" margin="normal" sx={{mt:3}} />}
          />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" type="submit" onClick={handleConfirm}>
          Yes
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SearchDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SearchDialog;
