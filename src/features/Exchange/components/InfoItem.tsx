import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface Props {
  label: React.ReactNode
  info: React.ReactNode
  'data-cy'?: string
}

export default function InfoItem({ label, info, ...props }: Props) {
  return (
    <Box data-cy={props['data-cy']}>
      <Typography variant='body2' component='span' sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
      : {info}
    </Box>
  )
}
