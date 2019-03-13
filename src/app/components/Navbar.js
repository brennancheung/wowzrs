import React from 'react'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import NavItems from 'components/NavItems'
import TimeTrackerWidget from 'components/time/TimeTrackerWidget'
import { compose } from 'ramda'
import { withStyles } from '@material-ui/core/styles'
import { withAppContext } from 'core/AppContext'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  avatar: {
    marginLeft: 10,
  },
  navRightItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
  }
})

class Navbar extends React.Component {
  state = { open: true }

  handleDrawerOpen = () => { this.setState({ open: true }) }
  handleDrawerClose = () => { this.setState({ open: false }) }

  renderUser = () => {
    const { classes, context } = this.props
    const { handleSignOut, user } = context
    return (
      <div className={classes.navRightItems}>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary" className={classes.badge}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <div>
          <Button color="inherit" onClick={handleSignOut}>
            <Avatar alt={user.displayName} src={user.photoURL} className={classes.avatar} />
          </Button>
        </div>
      </div>
    )
  }

  render () {
    const { classes } = this.props
    const { open } = this.state
    const { handleSignIn, user } = this.props.context
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="absolute" className={classNames(classes.appBar, open && classes.appBarShift)}>
            <Toolbar disableGutters={!open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                Wowzrs Personal Management System
              </Typography>
              {user && this.renderUser()}
              {!user && <Button color="inherit" onClick={handleSignIn}>Sign in</Button>}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
            classes={{ paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose) }}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <NavItems />
            <TimeTrackerWidget />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {this.props.children}
          </main>
        </div>
      </React.Fragment>
    )
  }
}

export default compose(
  withStyles(styles),
  withAppContext,
)(Navbar)
