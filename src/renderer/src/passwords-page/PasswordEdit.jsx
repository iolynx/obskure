import React from 'react'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { List, ListItem, Divider } from '@mui/material'
import { Box, Typography, Button } from '@mui/material'
import zxcvbn from 'zxcvbn'
import StyledField from '../components/StyledInput'
import '../assets/main.scss'

export default function PasswordEdit({ onEdit, password }) {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)
  const strengthClass = ['strength-meter mt-2 visible'].join(' ').trim()
  const [newPassword, setNewPassword] = useState({
    service: password.service,
    creds: password.creds,
    other: password.other
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const nameParts = name.split('.')

    if (nameParts[1] === 'password') {
      updatePasswordStrength(value)
    }

    if (nameParts.length === 1) {
      setNewPassword((prev) => ({ ...prev, [name]: value }))
    } else {
      setNewPassword((prev) => {
        // Destructure the previous state to preserve other properties
        const updatedCreds = { ...prev.creds }

        // Drill down to the nested property
        updatedCreds[nameParts[1]] = value

        return {
          ...prev,
          creds: updatedCreds // Update only the 'creds' part of the state
        }
      })
    }
  }

  const handleSubmit = (e) => {
    console.log('Edited Password: ', newPassword)
    e.preventDefault()
    onEdit(newPassword, password)
  }

  const handleExit = (e) => {
    e.preventDefault()
    onEdit(null, password)
  }

  function updatePasswordStrength(password) {
    if (password) {
      const score = zxcvbn(password).score
      console.log(score)
      setStrength(score)
    }
  }

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        pt: 2,
        pl: 3,
        pr: 3,
        overflow: 'hidden'
      }}
    >
      <Typography variant="h3" color="text.info">
        Editing {password.service}
      </Typography>
      <StyledField
        name="service"
        placeholder="Service Name"
        defaultValue={password.creds.service}
        value={newPassword.service}
        onChange={handleChange}
        margin="normal"
        sx={{
          mb: 1,
          input: {
            fontSize: '20px'
          }
        }}
      />

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
                <Typography variant="caption" sx={{ color: 'text.bluegrey' }}>
                  {key}
                </Typography>
                <br />
                <StyledField
                  name={'creds.' + key}
                  defaultValue={value}
                  onChange={handleChange}
                  sx={{ ml: 1, mt: 0, mb: 0, pt: 0, pb: 0 }}
                />
              </Box>
            </ListItem>
            {index < Object.keys(password.creds).length - 1 && (
              <Divider sx={{ mt: 0.8, mb: 0.8 }} />
            )}
          </React.Fragment>
        ))}
      </List>

      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Website URL:</strong> (Leave Empty to Omit) <br />
      </Typography>

      <StyledField
        name="other"
        placeholder="URL"
        defaultValue={password.other}
        onChange={handleChange}
        sx={{
          fontSize: '20px'
        }}
      />

      <Typography sx={{ mt: 1 }}>Password Strength:</Typography>
      <div className={strengthClass}>
        <div className="strength-meter-fill" data-strength={strength}></div>
      </div>

      {/* is greyed out until changes are made */}
      <Button variant="outlined" onClick={handleSubmit} sx={{ margin: '10px' }}>
        Save Changes
      </Button>
      <Button variant="outlined" onClick={handleExit}>
        Cancel
      </Button>
    </Box>
  )
}

PasswordEdit.propTypes = {
  onEdit: PropTypes.func.isRequired, // Ensures onEdit is a required function
  password: PropTypes.shape({
    service: PropTypes.string.isRequired, // Ensures service is a required string
    creds: PropTypes.object.isRequired,
    other: PropTypes.string
  }).isRequired // Ensures the entire password object is required
}
