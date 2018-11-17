import React from 'react'
import { withAppContext } from 'core/AppContext'

const Home = ({ context, mutate }) => {
  // firebase has circular references so we can't JSON.stringify it
  const { firebase, db, ...rest } = context

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(rest, null, 4)}</pre>
    </div>
  )
}

export default withAppContext(Home)
