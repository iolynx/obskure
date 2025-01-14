import { TextField, Input, InputBase, ListItemText } from '@mui/material'
import { useState } from 'react'
import { Button, Box, Typography, Divider } from '@mui/material'
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import CustomSnackBar from '../components/CustomSnackbar'
import StyledInput from '../components/StyledInput'
import { AddRounded, PlusOneRounded } from '@mui/icons-material'
import { defaultTheme } from 'react-select'

export default function PasswordEntry({ onAddition }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [newPassword, setNewPassword] = useState({
    service: '',
    username: '',
    password: '',
    other: ''
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

      <StyledInput
        name="service"
        placeholder="Service Name"
        value={newPassword.service}
        onChange={handleChange}
        margin="normal"
        sx={{
          input: {
            fontSize: '20px'
          }
        }}
      />

      <Box
        sx={{
          height: '20px'
        }}
      ></Box>

      <List sx={{ backgroundColor: 'background.list', borderRadius: '12px' }}>
        <ListItem sx={{ display: 'block !important' }}>
          <StyledInput
            name="cred1"
            placeholder="label"
            sx={{
              mt: 0,
              pt: 0,
              input: {
                fontSize: '12px'
              }
            }}
          />
          <br />
          <StyledInput
            name="cred2"
            placeholder="value"
            sx={{
              mt: 0,
              pt: 0,
              input: {
                mt: 0,
                fontSize: '17px'
              }
            }}
          />
        </ListItem>
        <Divider sx={{ mb: 0.8 }} />
        <ListItem>
          <AddRounded /> <ListItemText> Add a Field... </ListItemText>
        </ListItem>
      </List>

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
