import React from 'react'
import {
  AppBar, Button,
  CssBaseline, Grid, Toolbar, Typography
} from '@material-ui/core'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import { compose } from 'ramda'
import { withAppContext } from 'core/AppContext'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Login = ({ classes, context }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <MyLocationIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Wowzrs
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Wowzrs
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Wowzrs is a personal productivty and management system for goals, actions, finances, and weight.
              <br />
              <br />
              This is currently a personal project and not open to the public.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={context.handleSignIn}>
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default compose(
  withAppContext,
  withStyles(styles)
)(Login)
