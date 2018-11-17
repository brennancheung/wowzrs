import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import AppContext from 'core/AppContext'
import FirebaseContainer from 'core/FirebaseContainer'
import Home from 'components/Home'
import Navbar from 'components/Navbar'
import './app.css'

const initialContext = {
  foo: 'bar'
}

const themeOptions = {
  typography: {
    useNextVariants: true,
  }
}

class App extends React.Component {
  render () {
    const theme = createMuiTheme(themeOptions)

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppContext initialContext={initialContext}>
            <div id="main-container">
              <FirebaseContainer>
                <Navbar>
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Redirect to="/" />
                  </Switch>
                </Navbar>
              </FirebaseContainer>
            </div>
          </AppContext>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
