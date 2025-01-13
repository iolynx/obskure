import { TextField, Input } from '@mui/material'
import { useState } from 'react'
import { Button, Box, Typography } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import CustomSnackBar from '../components/CustomSnackbar'

export default function PasswordEntry({ onAddition, curFolder }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [newPassword, setNewPassword] = useState({
    service: curFolder === 'All' ? '' : curFolder,
    username: '',
    password: '',
    other: '',
    alias: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPassword((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log('New Password Entry:', newPassword)
  }

  const handleSubmit = (event) => {
    handleSave()
    event.preventDefault()
    if (newPassword.service !== '') {
      onAddition(newPassword)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        flex: 1,
        height: '100%',
        pt: 3,
        pl: 3,
        pr: 3,
        overflow: 'hidden'
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        Add a new Password
      </Typography>

      {curFolder === 'All' ? (
        <TextField
          name="service"
          placeholder="Service Name"
          value={newPassword.service}
          onChange={handleChange}
          margin="normal"
          sx={{
            mt: 3,
            ml: 1
          }}
        />
      ) : (
        <Typography variant="h3" sx={{ mt: 2 }}>
          {curFolder}
        </Typography>
      )}

      <Box
        sx={{
          height: '20px'
        }}
      ></Box>

      {/* <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Website URL:</strong> <br />
      </Typography> */}

      {curFolder !== 'All' ? (
        <TextField
          placeholder="Alias (Optional)"
          name="alias"
          value={newPassword.alias}
          onChange={handleChange}
          margin="normal"
          sx={{
            transformOrigin: 3,
            ml: 1
          }}
        />
      ) : (
        <></>
      )}

      <br />
      <LanguageRoundedIcon sx={{ position: 'relative', top: '6px' }} />

      <Input
        label="URL"
        placeholder="Website URL"
        name="other"
        value={newPassword.other}
        onChange={handleChange}
        margin="normal"
        sx={{
          transformOrigin: 3,
          ml: 1
        }}
      />
      <br />
      <br />

      <AccountCircleRoundedIcon sx={{ position: 'relative', top: '7px' }} />
      <Input
        label="Username"
        placeholder="Username"
        name="username"
        value={newPassword.username}
        onChange={handleChange}
        margin="normal"
        sx={{
          ml: 1
        }}
      />

      <br />
      <br />

      <LockOpenRoundedIcon sx={{ position: 'relative', top: '7px' }} />
      <Input
        label="Password"
        name="password"
        placeholder="Password"
        value={newPassword.password}
        onChange={handleChange}
        type="password"
        margin="normal"
        sx={{
          ml: 1
        }}
      />

      <br />
      <br />

      <Button type="submit" variant="outlined" onClick={handleSave} sx={{ mt: 2 }}>
        Save
      </Button>
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Box>
  )
}
