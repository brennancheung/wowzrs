import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
  }
})

const IconButton = ({ classes, Icon, children, ...props }) => (
  <Button {...props}>
    <Icon className={classes.icon} />
    {children}
  </Button>
)

IconButton.defaultProps = {
  variant: 'contained',
}

export default withStyles(styles)(IconButton)
