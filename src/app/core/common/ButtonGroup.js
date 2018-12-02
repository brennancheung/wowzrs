import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing.unit * 1,
    }
  }
})

const ButtonGroup = ({ classes, children, ...props }) => <div className={classes.root} {...props}>{children}</div>

export default withStyles(styles)(ButtonGroup)
