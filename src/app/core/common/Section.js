import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { compose } from 'ramda'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    marginBottom: theme.spacing.unit * 1,
  }
})

const Section = ({ classes, title, children }) => (
  <Paper className={classes.root}>
    {title && <Typography variant="h5" className={classes.title}>{title}</Typography>}
    {children}
  </Paper>
)

export default compose(
  withStyles(styles),
)(Section)
