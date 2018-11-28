import React from 'react'
import GoalsForToday from './GoalsForToday'
import { withAppContext } from 'core/AppContext'
import { compose } from 'ramda'

const Home = ({ context }) => (
  <div>
    <GoalsForToday />
  </div>
)

export default compose(
  withAppContext,
)(Home)
