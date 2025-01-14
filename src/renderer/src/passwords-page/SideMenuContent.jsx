import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded'
import WifiPasswordRoundedIcon from '@mui/icons-material/WifiPasswordRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

// TODO: getting mainlist items from the electron api
const mainListItems = [
  { text: 'All', icon: <HomeRoundedIcon /> },
  { text: 'Passkeys', icon: <KeyRoundedIcon /> },
  { text: 'Wifi', icon: <WifiPasswordRoundedIcon /> },
  { text: 'Deleted', icon: <DeleteRoundedIcon /> }
]

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> }
]

export default function SideMenuContent({ setCurFolder }) {
  const [folders, setFolders] = useState([])
  useEffect(() => {
    async function fetchFolders() {
      try {
        const result = await window.electronAPI.getFolders()
        if (result.error) {
          console.log(result.error)
        } else {
          setFolders(result)
        }
      } catch (err) {
        console.error('Error fetching passwords:', err)
      }
    }
    fetchFolders()
  }, [])

  const createFolder = () => {
    // write some code to create a dialog
    // and then when the user accepts create it
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0} onClick={() => setCurFolder(item.text)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {folders.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => setCurFolder(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem
          key="add"
          disablePadding
          sx={{ display: 'block', border: '1px dashed grey', borderRadius: '10px' }}
        >
          <ListItemButton onClick={() => createFolder}>
            <ListItemIcon>
              {' '}
              <AddRoundedIcon />{' '}
            </ListItemIcon>
            <ListItemText primary="Add Record" />
          </ListItemButton>
        </ListItem>
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
