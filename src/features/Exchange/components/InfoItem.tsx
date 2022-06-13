import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface Props {
  label: React.ReactNode
  info: React.ReactNode
}

export default function InfoItem(props: Props) {
  return (
    <Box>
      <Typography variant='body2' component='span' sx={{ fontWeight: 500 }}>
        {props.label}
      </Typography>
      : {props.info}
    </Box>
  )
}
