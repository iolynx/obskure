import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Snackbar, Alert } from '@mui/material'
import PasswordInfo from './PasswordInfo'
import PasswordsList from './PasswordsList'
import PasswordEntry from './PasswordEntry'
import PasswordEdit from './PasswordEdit'

export default function MainContent({ addMode, setAddMode, curFolder }) {
  const [passwords, setPasswords] = useState([])
  const [selectedPassword, setSelectedPassword] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setSelectedPassword(null)
    async function fetchPasswords() {
      try {
        console.log(curFolder)
        const result = await window.electronAPI.getPasswords(curFolder)
        if (result.error) {
          console.log('From MainContent: ', result.error)
          setError(result.error)
        } else {
          setPasswords(result)
          setError(null)
        }
      } catch (err) {
        console.error('Error fetching passwords:', err)
        setError('An unexpected error occurred.')
      }
    }
    fetchPasswords()
  }, [curFolder])

  const handlePasswordSelect = (password) => {
    setSelectedPassword(password)
    setAddMode(false)
    setEditMode(false)
  }

  const handlePasswordDelete = async (password) => {
    const result = await window.electronAPI.deletePassword(password, curFolder)
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
    window.electronAPI.savePassword(newPassword, curFolder).then((response) => {
      if (response.success) {
        setSnackbarMessage('Password saved successfully')
        setSnackbarOpen(true)
        console.log(response.newPasswords)
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

    window.electronAPI.deletePassword(oldPassword, curFolder).then((response) => {
      if (response.success) {
        window.electronAPI.savePassword(newPassword, curFolder).then((response) => {
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
          curFolder={curFolder}
        />
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden'
        }}
      >
        {addMode ? (
          <PasswordEntry onAddition={handlePasswordAddition} curFolder={curFolder} />
        ) : editMode ? (
          <PasswordEdit
            onEdit={handlePasswordEdit}
            password={selectedPassword}
            curFolder={curFolder}
          />
        ) : (
          <PasswordInfo
            password={selectedPassword}
            onDelete={handlePasswordDelete}
            editMode={editMode}
            setEditMode={setEditMode}
            curFolder={curFolder}
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
