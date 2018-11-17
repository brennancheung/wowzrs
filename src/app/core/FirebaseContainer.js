import React from 'react'
import { withAppContext } from 'core/AppContext'

const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

const fbConfig = {
  apiKey: 'AIzaSyDVDASxIzSEpsZM_f0HMY7HjC0U3-LSwCQ',
  authDomain: 'wowzrs-quantified-self.firebaseapp.com',
  databaseURL: 'https://wowzrs-quantified-self.firebaseio.com',
  projectId: 'wowzrs-quantified-self',
  storageBucket: 'wowzrs-quantified-self.appspot.com',
  messagingSenderId: '882333796544'
}

class FirebaseContainer extends React.Component {
  state = {
    initializing: true
  }

  onAuthStateChanged = user => {
    this.props.setContext({ user })
    this.setState({ initializing: false })
  }

  componentDidMount () {
    if (!firebase.apps.length) {
      firebase.initializeApp(fbConfig)
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    const db = firebase.firestore()
    db.settings({
      timestampsInSnapshots: true
    })
    this.props.setContext({ firebase, db })
  }

  render () {
    if (this.state.initializing) { return null }
    return this.props.children
  }
}

export default withAppContext(FirebaseContainer)
