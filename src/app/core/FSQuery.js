import React from 'react'
import PropTypes from 'prop-types'
import { withAppContext } from 'core/AppContext'

const buildOrder = (ref, orderBy) => {
  if (!orderBy) { return ref }
  const [head, ...tail] = orderBy
  if (head) { return buildOrder(ref.orderBy(...head), tail) }
  return ref
}

const buildWhere = (ref, where) => {
  if (!where) { return ref }
  return ref.where(...where)
}

class FSQueryBase extends React.Component {
  state = { data: null }

  async componentDidMount () {
    const { context, path, orderBy, where } = this.props
    const { db, user } = context

    const userId = (user && user.uid) || ''
    if (userId) { this.setState({ userId }) }

    const finalPath = path.replace('$userId', userId)
    const ref = db.collection(finalPath)
    const withOrder = buildOrder(ref, orderBy)
    const withWhere = buildWhere(withOrder, where)

    const isDoc = finalPath.split('/') % 2 === 0
    const isCollection = !isDoc

    this.unsubscribe = withWhere.onSnapshot(snapshot => {
      const data = isDoc
        ? snapshot.data()
        : snapshot.docs.map(x => ({ id: x.id, ...x.data() }))
      return this.setState({
        context,
        data,
        db,
        fsRef: ref, // React has reserved ref already
        isCollection,
        isDoc,
        userId,
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { data } = this.state
    if (!data) { return <div>Loading...</div> }
    return this.props.children(this.state)
  }
}

const FSQuery = withAppContext(FSQueryBase)

const orderByPropType = PropTypes.arrayOf(PropTypes.string.isRequired)

FSQuery.propTypes = {
  path: PropTypes.string.isRequired,
  orderBy: PropTypes.arrayOf(orderByPropType),
  where: PropTypes.array, // ['field', '==', value]
  /**
   * Children is a renderProp that can receive the following:
   *   { db, fsRef, data, userId, isCollection, isDoc }
   */
  children: PropTypes.func.isRequired,
}

export const withFSQuery = ({ path, orderBy, where }) => Component => props =>
  <FSQuery path={path} orderBy={orderBy} where={where}>
    {childProps => <Component {...childProps} {...props} />}
  </FSQuery>

export default FSQuery
