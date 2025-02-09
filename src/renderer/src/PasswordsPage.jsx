import { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import AppTheme from './shared-theme/AppTheme'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import SideMenu from './passwords-page/SideMenu'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Header from './components/Header'
import MainContent from './passwords-page/MainContent'
import { useState } from 'react'
import Popup from './components/AddPopup.jsx'

const PWContainer = styled(Stack)(({ theme }) => ({
  '&::before': {
    content: '""',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        // 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        'radial-gradient(at 50% 50%, hsla(110, 5%, 4%, 0.8), hsl(100, 3%, 3%))'
    })
  }
}))

export default function PasswordsPage(props) {
  const [addMode, setAddMode] = useState('')
  const [schemas, setSchemas] = useState([])
  const [schema, setSchema] = useState(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('All')

  const handleOpen = () => {
    setOpen(true) // Open the popup
  }

  const handleClose = () => {
    setOpen(false) // Close the popup
  }

  async function handleAddClick() {
    // get the schemas
    // open a popup
    // get the result from popup
    // feed that to passwordedit
    try {
      const result = await window.electronAPI.getSchemas()
      if (result.error) {
        console.log(result.error)
        //TODO: open a snackbar showing error
      } else {
        console.log(result)
        setSchemas(result)
      }
    } catch (err) {
      console.error('Error fetching passwords:', err)
      //TODO: open a snackbar showing error
    }
    handleOpen()
  }

  async function handleSchemaSelect(value) {
    try {
      const result = await window.electronAPI.getSchemaContents(value)
      if (result.error) {
        console.log(result.error)
      } else {
        console.log(result)
        setSchema(result)
      }
    } catch (err) {
      console.error('Error obtaining schema contents: ', err)
    }
    setAddMode(!addMode)
  }

  useEffect(() => {
    // Add class to body
    document.body.classList.add('custom-justify')

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('custom-justify')
    }
  }, [])

  return (
    <AppTheme {...props}>
      <CssBaseline />
      <PWContainer>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            alignItems: 'center',
            marginLeft: '-16px'
          }}
        >
          <SideMenu selected={selected} setSelected={setSelected} />
          <Divider orientation="vertical" />
          <Box
            component="main"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              p: 0,
              height: '100vh'
            }}
          >
            <Header onAddClick={handleAddClick} content={selected} />
            <MainContent addMode={addMode} setAddMode={setAddMode} schema={schema} selected={selected} />
          </Box>
        </Stack>
        <Popup
          open={open}
          handleClose={handleClose}
          title="Add Password"
          schemas={schemas}
          onValueSelect={handleSchemaSelect}
        />
      </PWContainer>
    </AppTheme>
  )
}
