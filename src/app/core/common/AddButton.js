import React from 'react'
import { Button } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

const AddButton = ({ children, onClick }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
  >
    <AddIcon />
    {children}
  </Button>
)

export default AddButton
