import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Grid2 } from '@mui/material'

// eslint-disable-next-line react/prop-types
const Popup = ({ open, handleClose, title, schemas, onValueSelect }) => {
  const handleClick = (value) => {
    onValueSelect(value) // Call the parent handler with the selected value
    handleClose() // Close the popup
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: '40%', maxHeight: 500 } }}
      PaperProps={{
        component: 'form',
        sx: { backgroundImage: 'none' }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={1}>
          {schemas.map((schema, index) => (
            <Grid2 item xs={4} key={index}>
              {/* 6 columns = 2 items per row */}
              <Button variant="outlined" fullWidth onClick={() => handleClick(schema)}>
                {schema}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default Popup
