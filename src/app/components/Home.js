import React from 'react'
import AddGoal from './AddGoal'
import GoalsForToday from './GoalsForToday'
import { withAppContext } from 'core/AppContext'
import { compose } from 'ramda'

const Home = ({ context }) => (
  <div>
    <AddGoal />
    <GoalsForToday />
  </div>
)

export default compose(
  withAppContext,
)(Home)
