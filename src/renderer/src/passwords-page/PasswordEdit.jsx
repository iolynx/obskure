import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import { Box, Typography, IconButton, Button } from '@mui/material'
import { Input, InputBase, InputAdornment } from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import zxcvbn from 'zxcvbn'
import '../assets/main.scss'

const StyledInput = styled(Input)(() => ({
  marginTop: 0,
  marginBottom: 0,
  input: {
    color: 'rgba(206, 236, 238, 0.7)'
  },
  fontWeight: 400,
  '&:before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.0)' // Default underline
  },
  '&:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)' // Hover state
  },
  '&:after': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.6)' // Focus state
  }
}))

export default function PasswordEdit({ onEdit, password, curFolder }) {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)
  const strengthClass = ['strength-meter mt-2 visible'].join(' ').trim()
  const [newPassword, setNewPassword] = useState({
    service: password.service,
    username: password.username,
    password: password.password,
    other: password.other,
    alias: password.alias
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPassword((prev) => ({ ...prev, [name]: value }))
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

  const handleTogglePassword = (event) => {
    event.preventDefault()
    setShowPassword((prev) => !prev)
  }

  useEffect(() => {
    console.log(password)
    if (password && password.password) {
      const score = zxcvbn(password.password).score
      setStrength(score)
    }
  }, [password])

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
      {password.alias ? (
        <Box
          sx={{
            height: '50px',
            display: 'block'
          }}
        >
          <Typography variant="h4">{password.service}</Typography>
          <InputBase
            placeholder="Alias (Optional)"
            name="alias"
            defaultValue={password.alias}
            value={password.alias}
            onChange={handleChange}
            sx={{
              transformOrigin: 3,
              mt: 2,
              mb: 10,
              input: {
                fontSize: '24px',
                fontWeight: 600,
                color: 'rgba(206, 236, 238, 0.7)'
              }
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: '50px',
            display: 'flex'
          }}
        >
          <InputBase
            name="service"
            placeholder="Service Name"
            defaultValue={password.service}
            onChange={handleChange}
            variant="outlined"
            margin="none"
            fullWidth
            sx={{
              input: {
                fontSize: '24px',
                fontWeight: 600,
                color: 'rgba(206, 236, 238, 0.7)'
              }
            }}
          />
        </Box>
      )}

      <Typography variant="body1" sx={{ mt: 5 }}>
        <strong>Website URL:</strong> (Leave Empty to Omit) <br />
      </Typography>

      <StyledInput
        name="other"
        placeholder="URL"
        defaultValue={password.other}
        onChange={handleChange}
        sx={{
          fontSize: '20px'
        }}
      />

      <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Username:</strong> <br />
      </Typography>

      <StyledInput
        name="username"
        placeholder="Username"
        defaultValue={password.username}
        onChange={handleChange}
        sx={{
          mt: 0,
          fontSize: '18px'
        }}
      />

      <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Password:</strong> <br />
      </Typography>

      <StyledInput
        name="password"
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
        defaultValue={password.password}
        onChange={handleChange}
        variant="outlined"
        sx={{
          input: {
            fontSize: '18px',
            fontWeight: 600
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              sx={{
                border: 'none',
                backgroundColor: 'transparent !important',
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent' // No hover background
                }
              }}
              aria-label="toggle password visibility"
              onClick={handleTogglePassword}
            >
              {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
            </IconButton>
          </InputAdornment>
        }
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
    username: PropTypes.string.isRequired, // Ensures username is a required string
    password: PropTypes.string.isRequired, // Ensures password is a required string
    other: PropTypes.string,
    alias: PropTypes.string
  }).isRequired // Ensures the entire password object is required
}
