import React from 'react'
import PropTypes from 'prop-types'
import { withAppContext } from 'core/AppContext'
import { compose } from 'ramda'

class FSQuery extends React.Component {
  state = { data: null }

  async componentDidMount () {
    const { context, path } = this.props
    const { db, user } = context

    const userId = (user && user.uid) || ''
    if (userId) { this.setState({ userId }) }

    const finalPath = path.replace('$userId', userId)
    const ref = db.collection(finalPath)

    const isDoc = finalPath.split('/') % 2 === 0
    const isCollection = !isDoc

    this.unsubscribe = ref.onSnapshot(snapshot => {
      const data = isDoc
        ? snapshot.data()
        : snapshot.docs.map(x => ({
          id: x.id,
          ...x.data(),
        }))
      return this.setState({
        data,
        userId,
        isCollection,
        isDoc,
      })
    })
  }

  componentwillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { data } = this.state
    if (!data) { return <div>Loading...</div> }
    return this.props.children({ data: this.state.data })
  }
}

FSQuery.propTypes = {
  path: PropTypes.string.isRequired,
  /**
   * Children is a renderProp that can receive the following:
   *   { data, snapshot, userId }
   */
  children: PropTypes.func.isRequired,
}

export default compose(
  withAppContext,
)(FSQuery)
