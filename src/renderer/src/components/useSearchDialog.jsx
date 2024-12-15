import React, { useState } from 'react';
import SearchDialog from './SearchDialog';

function useSearchDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogResolve, setDialogResolve] = useState(null);
  const [dialogTitle, setTitle] = useState('');
  const [dialogContent, setContent] = useState('');

  const showDialog = (title, content) => {
    setTitle(title);
    setContent(content)
    setDialogOpen(true);

    return new Promise((resolve) => {
      setDialogResolve(() => resolve); // Save the resolve function
    }).finally(() => {
      setDialogOpen(false); // Ensure the dialog closes after resolving
    });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = (value) => {
    if (dialogResolve) dialogResolve(value); // Resolve the promise with true/false
  };

  const SearchDialogComponent = (
    <SearchDialog
      open={dialogOpen}
      handleClose={handleClose}
      onConfirm={handleConfirm}
      title={dialogTitle}
      content={dialogContent}
    />
  );

  return { showDialog, SearchDialogComponent };
}

export default useSearchDialog;
