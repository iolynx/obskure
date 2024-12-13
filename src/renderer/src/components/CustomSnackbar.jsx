export default function CustomSnackbar() {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={1400}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
