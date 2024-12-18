import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import { Paper, List, IconButton, Snackbar, Alert, Tooltip } from '@mui/material'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

export default function PasswordsList({ passwords, onPasswordSelect, error }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSelect = (index, password) => {
    setSelectedIndex(index)
    onPasswordSelect(password)
  }

  const handleCopy = (password) => {
    navigator.clipboard
      .writeText(password)
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'visible',
        p: 2,
        boxShadow: 3,
        flex: 1, // Allow it to stretch in the flex container
        width: '100%'
      }}
    >
      {error ? (
        <p> {error} </p>
      ) : (
        <List
          direction="row"
          sx={{
            p: 0,
            gap: 1,
            alignItems: 'center',
            maxWidth: '100%',
            // borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          {passwords.map((password, index) => (
            <>
              <ListItem
                key={index}
                button={true}
                sx={{
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  pr: 1,
                  pl: 1,
                  backgroundColor:
                    selectedIndex === index ? 'rgba(22, 25, 29, 0.6)' : 'transparent',
                  transition: 'background-color 0.2s'
                  // padding: '8px 16px'
                }}
                onClick={() => handleSelect(index, password)}
              >
                <Stack direction="column" spacing={-2}>
                  <Typography
                    variant="body1"
                    display="block"
                    sx={{ fontWeight: 500, lineHeight: '16px' }}
                  >
                    {password.service}
                    <br />
                  </Typography>
                  <br />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {password.username}
                  </Typography>
                </Stack>
                <Box>
                  <Tooltip title="Copy Password">
                    <IconButton
                      aria-label="copy"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(password.password)
                      }}
                    >
                      <ContentCopyRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
              <Divider width="110%" />
            </>
          ))}
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
        </List>
      )}
    </Box>
  )
}
