import React from 'react'
import { Typography } from '@material-ui/core'
import { join, map, pipe } from 'ramda'
import { dropIf, isZero } from 'core/fp'
import { zeroPad } from 'core/utils'

export const timeComponents = d => {
  const seconds = d / 1000
  const minute = 60
  const hour = 60 * minute
  const day = 24 * hour
  const getComponent = x => Math.floor((seconds / x) % x)
  return [
    ...[day, hour, minute].map(getComponent),
    Math.floor(seconds) % minute,
  ]
}

const dropLeadingZero = dropIf(isZero)

const Duration = ({ ms, small }) => {
  const str = pipe(
    timeComponents,
    dropLeadingZero, // days are optional
    dropLeadingZero, // hours are optional
    map(zeroPad(2)),
    join(':'),
  )(ms)
  const variant = small ? 'body1' : 'h4'
  return <Typography variant={variant}>{str}</Typography>
}

export default Duration
