import React from 'react'
import PropTypes from 'prop-types'
import { withAppContext } from 'core/AppContext'
import { compose } from 'ramda'

class FSCollection extends React.Component {
  state = { data: null }

  async componentDidMount () {
    const { context, path } = this.props
    const { db, user } = context

    const userId = (user && user.uid) || ''
    if (userId) { this.setState({ userId }) }

    const finalPath = path.replace('$userId', userId)
    const collection = db.collection(finalPath)
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

export default compose(
  withAppContext,
)(FSCollection)
