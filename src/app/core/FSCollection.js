import React from 'react'
import PropTypes from 'prop-types'
import { withAppContext } from 'core/AppContext'
import { compose } from 'ramda'

export const interpolatePath = ({ context, path }) => {
  const { user } = context
  const userId = (user && user.uid) || ''
  const finalPath = path.replace('$userId', userId)
  return { userId, finalPath }
}

export const interpolateUserPath = ({ context, path }) =>
  interpolatePath({ context, path: `/users/$userId${path}` })

export const getCollection = ({ context, path }) => {
  const { db } = context
  const { userId, finalPath } = interpolatePath({ context, path })
  const collection = db.collection(finalPath)
  return { collection, userId }
}

class FSCollection extends React.Component {
  state = { data: null }

  async componentDidMount () {
    const { context, path } = this.props
    const { collection, userId } = getCollection({ context, path })
    if (userId) { this.setState({ userId }) }
    this.setState({ collection, userId })
  }

  render () {
    const { collection } = this.state
    if (!collection) { return <div>Loading...</div> }
    return this.props.children(this.state)
  }
}

FSCollection.propTypes = {
  path: PropTypes.string.isRequired,
  /**
   * Children is a renderProp that can receive the following:
   *   { collection, userId }
   */
  children: PropTypes.func.isRequired,
}

export const withUserCollections = paths => Component => props => {
  const FSCollections = withAppContext(
    ({ context }) => {
      const { db } = context
      const collections = Object.entries(paths).reduce(
        (accum, [key, path]) => {
          const userPath = interpolateUserPath({ context, path })
          accum[key] = db.collection(userPath.finalPath)
          return accum
        },
        {}
      )
      return (
        <Component
          context={context}
          db={db}
          collections={collections}
          {...props}
        />
      )
    }
  )

  return <FSCollections />
}

export default compose(
  withAppContext,
)(FSCollection)
