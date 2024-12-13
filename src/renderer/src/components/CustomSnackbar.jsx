import { Snackbar, Alert } from "@mui/material";

export default function CustomSnackbar({ snackbarOpen, snackbarMessage, onClose}) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={1400}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity='success' sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
