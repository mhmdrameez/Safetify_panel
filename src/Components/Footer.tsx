import React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <Typography variant='body2' color='text.secondary' align='center' sx={{ pt: 4 }}>
      {'Copyright © '}
      <Link color='inherit' href='https://m.com/'>
        Safetif
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}
