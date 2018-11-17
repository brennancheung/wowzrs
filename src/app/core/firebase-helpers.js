import React from 'react'
import { withAppContext } from 'core/AppContext'

export const withQuery = query => ComponentToWrap => {
  class Component extends React.Component {
    state = { snapshot: null }

    async componentDidMount () {
      const snapshot = await this.props.context.db.collection(query).get()
      this.setState({ snapshot })
    }

    render () {
      const { snapshot } = this.state
      if (!snapshot) { return null }
      return <ComponentToWrap {...this.props} snapshot={snapshot} />
    }
  }
  return withAppContext(Component)
}

export const withCollection = collection => ComponentToWrap => {
  class Component extends React.Component {
    state = { data: null }

    async componentDidMount () {
      const snapshot = await this.props.context.db.collection(collection).get()
      const data = snapshot.docs.map(x => x.data())
      this.setState({ data })
    }

    render () {
      const { data } = this.state
      if (!data) { return null }
      return <ComponentToWrap {...this.props} data={data} />
    }
  }
  return withAppContext(Component)
}
