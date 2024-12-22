/* eslint-disable react/prop-types */
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { IconButton, Tooltip } from '@mui/material'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import { Snackbar, Alert } from '@mui/material'
import { useState, useEffect } from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import useConfirmation from './useConfirmation'
import zxcvbn from 'zxcvbn'
import '../assets/main.scss'

export default function PasswordInfo({ password, onDelete }) {
  const [showPassword, setShowPassword] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [result, setResult] = useState(false)
  const [strength, setStrength] = useState(0)
  const { showDialog, DialogComponent } = useConfirmation()

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleCopyPassword = () => {
    navigator.clipboard
      .writeText(password.password)
      .then(() => {
        setSnackbarMessage('Password copied to clipboard!')
        setSnackbarOpen(true)
      })
      .catch((err) => {
        console.error('Failed to copy password: ', err)
        setSnackbarMessage('Failed to copy password')
        setSnackbarOpen(true)
      })
  }

  const handleCopyUsername = () => {
    navigator.clipboard
      .writeText(password.username)
      .then(() => {
        setSnackbarMessage('Username copied to clipboard!')
        setSnackbarOpen(true)
      })
      .catch((err) => {
        console.error('Failed to copy Username: ', err)
        setSnackbarMessage('Failed to copy Username')
        setSnackbarOpen(true)
      })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleResult = (val) => {
    setResult(val)
  }

  const handleDelete = async () => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    const userConfirmed = await showDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this entry?'
    )
    if (userConfirmed) {
      onDelete(password)
      setResult(false)
    }
  }

  const strengthClass = ['strength-meter mt-2 visible'].join(' ').trim()

  useEffect(() => {
    if (password !== null) {
      const score = zxcvbn(password.password).score
      setStrength(score)
    }
  }, [password])

  return (
    <Box
      sx={{
        flex: 1, // Allow it to stretch in the flex container
        height: '100%', // Occupy full height
        pt: 3,
        pl: 3,
        pr: 3,
        overflow: 'hidden'
      }}
    >
      {password ? (
        <>
          <Box
            sx={{
              height: '50px',
              display: 'flex'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {password.service}
            </Typography>
            <Box
              sx={{
                width: '95%'
              }}
            ></Box>

            <Tooltip title="Edit Record">
              <IconButton aria-label="delete" size="small" sx={{ mr: 1 }}>
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Record">
              <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {password.other ? (
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Website URL:</strong> <br />
            </Typography>
          ) : (
            <></>
          )}

          <a href={'https://' + password.other} target="_blank" rel="noopener noreferrer">
            <Typography button variant="h5" color="lightblue">
              <u>{password.other}</u>
            </Typography>
          </a>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Username:</strong> <br />
          </Typography>
          <Typography
            variant="h6"
            color="textTertiary"
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {password.username}
            <IconButton aria-label="copy" size="small" sx={{ ml: 3 }} onClick={handleCopyUsername}>
              <ContentCopyRoundedIcon />
            </IconButton>
          </Typography>

          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Password:</strong> <br />
          </Typography>
          <Typography
            variant="h6"
            color="textTertiary"
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {showPassword ? password.password : '••••••••••'}
            <Box>
              <IconButton aria-label="view-password" size="small" onClick={handleTogglePassword}>
                {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
              </IconButton>
              <IconButton
                aria-label="copy"
                size="small"
                sx={{ ml: 1 }}
                onClick={handleCopyPassword}
              >
                <ContentCopyRoundedIcon />
              </IconButton>
            </Box>
          </Typography>

          <Typography>Password Strength:</Typography>
          <div className={strengthClass}>
            <div className="strength-meter-fill" data-strength={strength}></div>
          </div>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1400}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

          {DialogComponent}
        </>
      ) : (
        <Typography variant="body1">Select an account to get started.</Typography>
      )}
    </Box>
  )
}
