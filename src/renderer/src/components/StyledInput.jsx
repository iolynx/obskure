import { styled } from '@mui/material/styles'
import { InputBase } from '@mui/material'

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  borderRadius: '10px',
  backgroundColor: theme.palette.background.list,
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.background.list
  }
}))

export default StyledInput
