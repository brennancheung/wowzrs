import React from 'react'
import { Button } from '@material-ui/core'

const TimeButton = ({ children, onTimeChange, step, unit, ...props }) => {
  const handleClick = e => {
    e.stopPropagation()
    onTimeChange(step, unit)
  }
  return (
    <Button variant="contained" onClick={handleClick}>{children}</Button>
  )
}

export default TimeButton
