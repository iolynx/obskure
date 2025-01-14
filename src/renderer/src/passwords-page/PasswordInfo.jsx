/* eslint-disable react/prop-types */
import { Divider } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { IconButton, Button, Tooltip } from '@mui/material'
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
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

export default function PasswordInfo({ password, onDelete, editMode, setEditMode }) {
  const [showPassword, setShowPassword] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [strength, setStrength] = useState(0)
  const { showDialog, DialogComponent } = useConfirmation()
  const strengthClass = ['strength-meter mt-2 visible'].join(' ').trim()

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

  const handleDelete = async () => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    const userConfirmed = await showDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this entry?'
    )
    if (userConfirmed) {
      onDelete(password)
    }
  }

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  useEffect(() => {
    console.log(password)
    if (password && password.creds.password) {
      const score = zxcvbn(password.creds.password).score
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
              minWidth: '85%'
            }}
          ></Box>

          <Tooltip title="Edit Record">
            <Button aria-label="delete" sx={{ mr: 1 }} onClick={handleEdit}>
              <EditRoundedIcon fontSize="14px" /> &nbsp; Edit
            </Button>
          </Tooltip>

          <Tooltip title="Delete Record">
            <Button aria-label="delete" onClick={handleDelete}>
              <DeleteRoundedIcon fontSize="14px" /> &nbsp; Delete
            </Button>
          </Tooltip>
          <Box
            sx={{
              height: '50px',
              display: 'flex'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {password.service}
            </Typography>
          </Box>
          <List
            sx={{
              borderRadius: '12px',
              backgroundColor: 'background.list'
            }}
          >
            {Object.entries(password.creds).map(([key, value], index) => (
              <React.Fragment key={key}>
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover .copy-icon': { opacity: 1, visibility: 'visible' }
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.bluegrey' }}>{key}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 1}} >{value}</Typography>
                  </Box>
                  <Box>
                    <ListItemIcon
                      className="copy-icon"
                      sx={{
                        opacity: 0,
                        visibility: 'hidden',
                        transition: 'opacity 0.1s, visibility 0.1s'
                      }}
                      onClick={handleCopyPassword}
                    >
                      <ContentCopyRoundedIcon />
                    </ListItemIcon>
                  </Box>
                </ListItem>
                {index < Object.keys(password.creds).length - 1 && (
                  <Divider sx={{ mt: 0.8, mb: 0.8 }} />
                )}
              </React.Fragment>
            ))}
          </List>

          {password.other ? (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body1">
                Website URL:
              </Typography>
              <a href={'https://' + password.other} target="_blank" rel="noopener noreferrer">
                <Typography button variant="h5" color="lightblue">
                  <u>{password.other}</u>
                </Typography>
              </a>
            </Box>
          ) : (
            <></>
          )}

          <Typography sx={{mt: 2}}>Password Strength:</Typography>
          <div className={strengthClass} style={{ width: '240px' }}>
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
