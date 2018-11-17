import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { compose } from 'ramda'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

const Section = ({ classes, title, children }) => (
  <Paper className={classes.root}>
    <Typography variant="h5">{title}</Typography>
    {children}
  </Paper>
)

export default compose(
  withStyles(styles),
)(Section)
