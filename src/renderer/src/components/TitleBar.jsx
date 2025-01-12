import { Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'

export default function TitleBar({ curFolder }) {
  return (
    <Box>
      <Typography variant="h4">{curFolder}</Typography>
    </Box>
  )
}
