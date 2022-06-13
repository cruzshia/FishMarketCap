import React from 'react'
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@mui/icons-material/Facebook'
import TelegramIcon from '@mui/icons-material/Telegram'
import RedditIcon from '@mui/icons-material/Reddit'
import FeedIcon from '@mui/icons-material/Feed'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Slack } from './Icons'
import { ExchangeInfo } from '../exchangeApi'

const LINK_SX = { ml: '4px', fontSize: '14px' }

function SocialItem({ icon, url, ...props }: { icon: React.ReactNode; url: string }) {
  return (
    <Grid container alignItems='center' sx={{ mt: '6px' }} {...props}>
      {icon}
      <Link href={url} target='_blank' underline='none' sx={LINK_SX}>
        {url}
      </Link>
    </Grid>
  )
}

function SocailMeida(props: ExchangeInfo) {
  const { t } = useTranslation()
  return (
    <Grid container flexDirection='column' sx={{ mt: '4px', wordBreak: 'break-word' }}>
      <Typography variant='body2' sx={{ fontWeight: 500 }}>
        {t('socialMedia')}:
      </Typography>
      {props.facebook_url && <SocialItem data-cy='facebook' icon={<FacebookIcon />} url={props.facebook_url} />}
      {props.telegram_url && <SocialItem data-cy='telegram' icon={<TelegramIcon />} url={props.telegram_url} />}
      {props.reddit_url && <SocialItem data-cy='reddit' icon={<RedditIcon />} url={props.reddit_url} />}
      {props.slack_url && <SocialItem data-cy='slack' icon={<Slack />} url={props.slack_url} />}
      {props.other_url_1 && <SocialItem icon={<FeedIcon />} url={props.other_url_1} />}
      {props.other_url_2 && <SocialItem icon={<FeedIcon />} url={props.other_url_2} />}
    </Grid>
  )
}

export default SocailMeida
