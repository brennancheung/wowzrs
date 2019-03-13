import React from 'react'
import { withFSQuery } from 'core/FSQuery'
import { compose } from 'ramda'

const TimeFocus = ({ data }) => {
}

export default compose(
  withFSQuery({ path: '/users/$userId/timeJournal' }),
)(TimeFocus)
