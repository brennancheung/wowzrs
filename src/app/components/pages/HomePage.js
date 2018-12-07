import React from 'react'
import AddAction from 'components/actions/AddAction'
import ActionsForToday from 'components/actions/ActionsForToday'
import { withAppContext } from 'core/AppContext'
import { compose } from 'ramda'

const Home = ({ context }) => (
  <div>
    <AddAction />
    <ActionsForToday />
  </div>
)

export default compose(
  withAppContext,
)(Home)
