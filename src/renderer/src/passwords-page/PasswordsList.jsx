import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import { Paper, List, Button, IconButton, Snackbar, Alert, Tooltip } from '@mui/material'
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
        p: 0,
        boxShadow: 3,
        flex: 1,
        width: '100%'
      }}
    >
      {error ? (
        <p> {error} </p>
      ) : (
        <List
          direction="row"
          sx={{
            pl: 0,
            gap: 0,
            alignItems: 'center',
            maxWidth: '100%'
            // borderTop: '1px solid',
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
                  pt: 1.5,
                  pb: 1.5,
                  pr: 1,
                  pl: 1,
                  backgroundColor:
                    selectedIndex === index ? 'rgba(22, 25, 29, 0.6)' : 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover .copy-button': { opacity: 1, visibility: 'visible' }
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
                    {password.creds.username}
                  </Typography>
                </Stack>
                <Box
                  className="copy-button"
                  sx={{
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'opacity 0.1s, visibility 0.1s',
                    scale: 0.8
                  }}
                >
                  <Tooltip title="Copy Password">
                    <Button
                      aria-label="copy"
                      sx={{ maxWidth: '10px' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(password.creds.password)
                      }}
                    >
                      <ContentCopyRoundedIcon fontSize="12px" />
                    </Button>
                  </Tooltip>
                </Box>
              </ListItem>
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
