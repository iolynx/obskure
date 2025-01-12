import { useState } from 'react'
import Confirmation from './Confirmation'

function useConfirmation() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogResolve, setDialogResolve] = useState(null)
  const [dialogTitle, setTitle] = useState('')
  const [dialogContent, setContent] = useState('')

  const showDialog = (title, content) => {
    setTitle(title)
    setContent(content)
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

  const DialogComponent = (
    <Confirmation
      open={dialogOpen}
      handleClose={handleClose}
      onConfirm={handleConfirm}
      title={dialogTitle}
      content={dialogContent}
    />
  )

  return { showDialog, DialogComponent }
}

export default useConfirmation
