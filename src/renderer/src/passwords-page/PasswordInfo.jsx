/* eslint-disable react/prop-types */
import { ButtonBase, Divider, Icon } from '@mui/material'
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
import { StarRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

export default function PasswordInfo({ password, onDelete, editMode, setEditMode }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [strength, setStrength] = useState(0)
  const { showDialog, DialogComponent } = useConfirmation()
  const strengthClass = ['strength-meter mt-2 visible'].join(' ').trim()
  const [favourites, setFavourites] = useState([])
  const [showPassword, setShowPassword] = useState(
    password ? Array(Object.keys(password.creds).length).fill(false) : []
  )

  const fetchFavourites = async () => {
    try {
      const favs = await window.electronAPI.getFavourites()
      setFavourites(favs)
    } catch (error) {
      console.error("Failed to fetch favourites:", error)
    }
  }

  useEffect(() => {
    fetchFavourites(); // This will run once when the component mounts
  }, []);

  const togglePasswordVisibility = (index) => {
    console.log('showpassword: ', showPassword)
    setShowPassword(
      (prev) => prev.map((item, i) => (i === index ? !item : item)) // Toggle only the item at the specified index
    )
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

  const handleFavourite = async (newItem) => {
    await fetchFavourites()
    try {
      if (favourites.includes(newItem)) {
        const result = await window.electronAPI.deleteFavourite(newItem)
        setFavourites(result)
      } else {
        console.log("inc is called")
        const result = await window.electronAPI.addFavourite(newItem)
        setFavourites(result)
      }
    } catch (err) {
      console.error("Could not update favourites :", err)
    }
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
        pt: 2,
        pl: 3,
        pr: 3
      }}
    >
      {password ? (
        <>
          <Box
            sx={{
              height: '50px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'top',
              mb: 1
            }}
          >
            <Box sx={{ width: '200px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: 600 }}>
                {password.service}
              </Typography>

              <Button
                aria-label="favourite"
                sx={{ backgroundColor: "theme.palette.primary.main", '&:hover': { backgroundColor: 'inherit' }, mr: 1 }}
                onClick={() => handleFavourite(password.id)}
              >
                <Tooltip title=
                  {favourites.includes(password.id) ? "Remove from Favourites" : "Add to Favourites"}
                >
                  {favourites.includes(password.id) ? (<FavoriteRoundedIcon size='large' />) : (<FavoriteBorderRoundedIcon size='large' />)}
                </Tooltip>
                &nbsp;
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mb: 5
              }}
            >

              <Button aria-label="edit" sx={{ mr: 1 }} onClick={handleEdit}>
                <EditRoundedIcon fontSize="14px" /> &nbsp; Edit
              </Button>

              <Button aria-label="delete" onClick={handleDelete}>
                <DeleteRoundedIcon fontSize="14px" /> &nbsp; Delete
              </Button>
            </Box>
          </Box>
          <List
            sx={{
              borderRadius: '12px',
              backgroundColor: 'background.list',
              pt: 0.5,
              pb: 0.5,
              maxWidth: '80%',
              minWidth: '200px'
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
                    '&:hover .copy-icon': { opacity: 1, visibility: 'visible' },
                    '&:hover .visibility-icon': { opacity: 1, visibility: 'visible' }
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.bluegrey' }}>
                      {key}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                      {!password.hide.includes(key)
                        ? value
                        : !showPassword[index]
                          ? '••••••••••••'
                          : value}
                    </Typography>
                  </Box>
                  <Box>
                    {password.hide.includes(key) && (
                      <ListItemIcon
                        className="visibility-icon"
                        sx={{
                          opacity: 0,
                          visibility: 'hidden',
                          transition: 'opacity 0.1s, visibility 0.1s',
                          mr: 2
                        }}
                        onClick={() => togglePasswordVisibility(index)}
                      >
                        {showPassword[index] ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </ListItemIcon>
                    )}
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
              <Typography variant="body1">Website URL:</Typography>
              {password.other.map((url, index) => (
                <a href={'https://' + url} target="_blank" rel="noopener noreferrer" key={index}>
                  <Typography button variant="h5" color="lightblue">
                    <u>{url}</u>
                  </Typography>
                </a>
              ))}
            </Box>
          ) : (
            <></>
          )}

          <Typography sx={{ mt: 2 }}>Password Strength:</Typography>
          <div className={strengthClass} style={{ width: '240px' }}>
            <div className="strength-meter-fill" data-strength={strength}></div>
          </div>


          <Typography sx={{ mt: 2 }}> Password Strength:</Typography>

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
        <Typography variant="body1" sx={{ mt: 2 }}>
          Select a Password :)
        </Typography>
      )}
    </Box>
  )
}
