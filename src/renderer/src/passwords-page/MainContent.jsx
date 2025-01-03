import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Snackbar, Alert } from '@mui/material'
import PasswordInfo from './PasswordInfo'
import PasswordsList from './PasswordsList'
import PasswordEntry from './PasswordEntry'
import PasswordEdit from './PasswordEdit'

export default function MainContent({ addMode, setAddMode }) {
  const [passwords, setPasswords] = useState([])
  const [selectedPassword, setSelectedPassword] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    async function fetchPasswords() {
      try {
        const result = await window.electronAPI.getPasswords()
        if (result.error) {
          console.log(result.error)
          setError(result.error)
        } else {
          setPasswords(result)
        }
      } catch (err) {
        console.error('Error fetching passwords:', err)
        setError('An unexpected error occurred.')
      }
    }
    fetchPasswords()
  }, [])

  const handlePasswordSelect = (password) => {
    setSelectedPassword(password)
    setAddMode(false)
    setEditMode(false)
  }

  const handlePasswordDelete = async (password) => {
    const result = await window.electronAPI.deletePassword(password)
    if (result.success) {
      setSnackbarMessage('Record Deleted Successfully')
      setSnackbarOpen(true)
      setPasswords(result.remainingEntries)
      setSelectedPassword(0)
    } else {
      console.error('Failed to delete Record: ', result.error)
      setSnackbarMessage('Failed to delete Record')
      setSnackbarOpen(true)
    }
  }

  const handlePasswordAddition = async (newPassword) => {
    window.electronAPI.savePassword(newPassword).then((response) => {
      if (response.success) {
        setSnackbarMessage('Password saved successfully')
        setSnackbarOpen(true)
        setPasswords(response.newPasswords)
        setAddMode(false)
        setSelectedPassword(0)
      } else {
        setSnackbarMessage('Error: Could not save Password')
        setSnackbarOpen(true)
        console.log(response.error)
      }
    })
  }

  const handlePasswordEdit = async (newPassword, oldPassword) => {
    setEditMode(false)

    if (newPassword === null) {
      console.log('no changes bro')
      setSelectedPassword(oldPassword)
      return
    }

    window.electronAPI.deletePassword(oldPassword).then((response) => {
      if (response.success) {
        window.electronAPI.savePassword(newPassword).then((response) => {
          if (response.success) {
            setSnackbarMessage('Password saved successfully')
            setSnackbarOpen(true)
            setPasswords(response.newPasswords)
            setSelectedPassword(newPassword)
          } else {
            setSnackbarMessage('Error: Could not save Password')
            setSnackbarOpen(true)
            console.log(response.error)
          }
        })
      } else {
        setSnackbarMessage('Error: Could not save Password')
      }
    })

    // take editedpassword
    // replace the edited password with the old one
    // using the api
  }
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box
      sx={{
        maxWidth: { sm: '100%', md: '100%' },
        overflow: 'auto',
        display: 'flex'
      }}
    >
      <Box
        sx={{
          flex: '1 1 auto',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: '#8897b3 #121212',
          borderRight: '2px solid',
          borderColor: 'divider',
          maxWidth: '300px',
          width: '300px'
        }}
      >
        <PasswordsList
          passwords={passwords}
          onPasswordSelect={handlePasswordSelect}
          error={error}
        />
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden'
        }}
      >
        {addMode ? (
          <PasswordEntry onAddition={handlePasswordAddition} />
        ) : editMode ? (
          <PasswordEdit onEdit={handlePasswordEdit} password={selectedPassword} />
        ) : (
          <PasswordInfo
            password={selectedPassword}
            onDelete={handlePasswordDelete}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}
      </Box>

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
    </Box>
  )
}
