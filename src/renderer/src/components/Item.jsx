import React from 'react';
import { Paper } from '@mui/material';
import { styled } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default Item;
