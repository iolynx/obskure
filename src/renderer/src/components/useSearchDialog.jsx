import { useState } from 'react'
import SearchDialog from './SearchDialog'

function useSearchDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogResolve, setDialogResolve] = useState(null)
  const [dialogTitle, setTitle] = useState('')
  const [dialogContent, setContent] = useState('')
  const [passwords, setPasswords] = useState([])

  const showDialog = (title, content) => {
    setTitle(title)
    setContent(content)
    getPasswords()
    setDialogOpen(true)

    return new Promise((resolve) => {
      setDialogResolve(() => resolve) // Save the resolve function
    }).finally(() => {
      setDialogOpen(false) // Ensure the dialog closes after resolving
    })
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleConfirm = (value) => {
    if (dialogResolve) dialogResolve(value) // Resolve the promise with true/false
  }

  async function getPasswords() {
    try {
      const result = await window.electronAPI.getPasswords()
      if (result.error) {
        console.log(result.error)
        setContent(result.error)
      } else {
        console.log('passwords received')
        const formattedData = result.map((item) => ({
          value: item.service,
          label: item.service
        }))
        setPasswords(formattedData)
      }
    } catch (err) {
      console.error('Error fetching passwords:', err)
      setContent('An unexpected error occurred.')
    }
  }

  const SearchDialogComponent = (
    <SearchDialog
      open={dialogOpen}
      handleClose={handleClose}
      onConfirm={handleConfirm}
      title={dialogTitle}
      content={dialogContent}
      passwords={passwords}
    />
  )

  return { showDialog, SearchDialogComponent }
}

export default useSearchDialog
