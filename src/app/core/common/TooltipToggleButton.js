import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import ToggleButton from '@material-ui/lab/ToggleButton'

// Unfortunately, ToggleButtonGroup uses React.children.map instead of context
// so wrapping with Tooltip breaks ToggleButton functionality.
// This is a workaround.
const TooltipToggleButton = ({ children, title, ...props }) => (
  <Tooltip title={title}>
    <ToggleButton {...props}>{children}</ToggleButton>
  </Tooltip>
)

export default TooltipToggleButton
