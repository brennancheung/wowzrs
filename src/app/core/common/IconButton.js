import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
  }
})

const IconButton = ({ classes, Icon, children, onClick, stopPropagation, ...props }) => {
  const handleClick = e => {
    stopPropagation && e.stopPropagation()
    onClick && onClick(e)
  }
  return (
    <Button onClick={handleClick} {...props}>
      <Icon className={classes.icon} />
      {children}
    </Button>
  )
}

IconButton.propTypes = {
  Icon: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
  stopPropagation: PropTypes.bool,
}

IconButton.defaultProps = {
  variant: 'contained',
}

export default withStyles(styles)(IconButton)
