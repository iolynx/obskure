/* eslint-disable react/prop-types */
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, Divider, Tooltip } from '@mui/material'
import { Box, Typography, Button, IconButton, ListItemIcon } from '@mui/material'
import zxcvbn from 'zxcvbn'
import StyledField from '../components/StyledInput'
import '../assets/main.scss'
import {
  AddRounded,
  DeleteRounded,
  VisibilityOffRounded,
  VisibilityRounded
} from '@mui/icons-material'

export default function PasswordEdit({ onEdit, password }) {
  const [urls, setUrls] = useState(password.other ? password.other : [])
  const [tags, setTags] = useState(password.tags ? password.tags : [])
  const strengthClass = ['strength-meter mt-2 visible'].join(' ').trim()
  const [visibility, setVisibility] = useState(
    Object.keys(password.creds).map((key) => password.hide.includes(key))
  )
  const [newPassword, setNewPassword] = useState({
    service: password.service,
    creds: password.creds,
    other: password.other,
    hide: password.hide,
    id: password.id || uuidv4(),
    tags: password.tags || []
  })
  const [strength, setStrength] = useState(() => {
    const hiddenValues = password.hide || [] // Ensure hidden is an array
    const firstHiddenKey = hiddenValues.length > 0 ? hiddenValues[0] : null // Get the first value or null

    if (firstHiddenKey && password.creds[firstHiddenKey]) {
      return zxcvbn(password.creds[firstHiddenKey]).score // Compute strength for the first hidden key
    }

    return 0 // Default strength if no valid key exists
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
  const handleAddURL = () => {
    setUrls([...urls, '']) // Add an empty string for a new URL field
  }

  const handleDeleteURL = (index) => {
    const updatedUrls = urls.filter((_, i) => i !== index)
    setUrls(updatedUrls)
  }

  // this is for handling tags
  const handleTagChange = (e, setTags) => {
    const result = e.target.value.split(",").map(word => word.trim());
    setTags(result);
    console.log(tags)
  }

  const handleURLChange = (index, value) => {
    const updatedUrls = [...urls]
    updatedUrls[index] = value
    setUrls(updatedUrls)
    newPassword.other = updatedUrls
  }

  const handleSubmit = (e) => {
    newPassword.tags = tags
    newPassword.other = urls
    console.log('Edited Password: ', newPassword)
    e.preventDefault()
    onEdit(newPassword, password)
  }

  const handleExit = (e) => {
    e.preventDefault()
    onEdit(null, password)
  }

  // update the password strength using zxcvbn module
  function updatePasswordStrength(password) {
    if (password) {
      const score = zxcvbn(password).score
      console.log(score)
      setStrength(score)
    }
  }

  // toggling the visibility of the password
  const handleChangeVisibility = (key, index) => {
    setVisibility((prev) => prev.map((item, i) => (i === index ? !item : item))) // Toggle only the item at the specified index
    if (!visibility[index]) {
      if (!password.hide.includes(key)) {
        setNewPassword((prev) => ({
          ...prev,
          hide: [...prev.hide, key]
        }))
      }
    } else if (visibility[index]) {
      if (password.hide.includes(key)) {
        setNewPassword((prev) => ({
          ...prev,
          hide: prev.hide.filter((item) => item !== key)
        }))
      }
    }
    console.log(newPassword.hide)
  }

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        pt: 2,
        pl: 3,
        pr: 3,
        overflow: 'visible'
      }}
    >
      <Typography variant="h3" color="text.info">
        Editing {password.service}
      </Typography>
      <StyledField
        name="service"
        placeholder="Service Name"
        defaultValue={password.service}
        value={newPassword.service}
        onChange={handleChange}
        margin="normal"
        sx={{
          mb: 1,
          pt: 0.2,
          pb: 0.2,
          input: {
            fontSize: '24px'
          }
        }}
      />

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
                '&:hover .visibility-icon': { opacity: 1, visibility: 'visible' }
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
                  placeholder={key}
                  onChange={handleChange}
                  sx={{ ml: 1, mt: 0, mb: 0, pt: 0, pb: 0 }}
                />
              </Box>
              <Box>
                <Tooltip title="Change Visibility">
                  <ListItemIcon
                    className="visibility-icon"
                    sx={{
                      opacity: 0,
                      visibility: 'hidden',
                      mt: 4,
                      mr: 1,
                      transition: 'opacity 0.1s, visibility 0.1s'
                    }}
                    onClick={() => handleChangeVisibility(key, index)}
                  >
                    {visibility[index] ? <VisibilityOffRounded /> : <VisibilityRounded />}
                  </ListItemIcon>
                </Tooltip>
              </Box>
            </ListItem>
            {index < Object.keys(password.creds).length - 1 && (
              <Divider sx={{ mt: 0.8, mb: 0.8 }} />
            )}
          </React.Fragment>
        ))}
      </List>

      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Website URL:</strong> <br />
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        {urls.map((url, index) => (
          <Box
            key={index}
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              '&:hover .delete-icon': { opacity: 1, visibility: 'visible' }
            }}
          >
            <StyledField
              key={index}
              name={`other[${index}]`}
              placeholder={`URL ${index + 1}`}
              value={url}
              onChange={(e) => handleURLChange(index, e.target.value)}
              sx={{
                p: 0.5,
                pl: 1,
                fontSize: '20px',
                maxWidth: '250px'
              }}
            />
            <IconButton
              className="delete-icon"
              size="small"
              sx={{ mt: 1, border: 'none', visibility: 'hidden' }}
              onClick={() => handleDeleteURL(index)}
            >
              <DeleteRounded />
            </IconButton>
          </Box>
        ))}
        <Button onClick={handleAddURL} sx={{ p: 0, mt: 1, width: '130px' }}>
          <AddRounded /> Add Another
        </Button>
      </Box>

      <Typography sx={{ mt: 1 }}>Password Strength:</Typography>
      <div className={strengthClass}>
        <div className="strength-meter-fill" data-strength={strength}></div>
      </div>


      <Box sx={{ maxWidth: '800px' }}>
        <Typography variant="h5" sx={{ mt: 4 }}>Tags: </Typography>
        <StyledField
          name="tag"
          defaultValue={password.tags ? password.tags : ""}
          placeholder="comma, separated, tags"
          onChange={(e) => handleTagChange(e, setTags)}
          sx={{
            p: 0.5,
            pl: 1,
            fontSize: '20px',
            maxWidth: '100vw'
          }}
        />
      </Box>

      {/* is greyed out until changes are made */}
      <Button variant="contained" onClick={handleSubmit} sx={{ margin: '10px' }}>
        Save Changes
      </Button>
      <Button variant="outlined" onClick={handleExit}>
        Cancel
      </Button>
    </Box >
  )
}

PasswordEdit.propTypes = {
  onEdit: PropTypes.func.isRequired, // Ensures onEdit is a required function
  password: PropTypes.shape({
    service: PropTypes.string.isRequired, // Ensures service is a required string
    creds: PropTypes.object.isRequired, //Ensures that creds is a required object
    other: PropTypes.string,
    tags: PropTypes.array,
  }).isRequired // Ensures the entire password object is required
}
