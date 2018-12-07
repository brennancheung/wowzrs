import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { omit, whereEq } from 'ramda'
import { Delete } from '@material-ui/icons'
import IconButton from 'core/common/IconButton'
import { withStyles } from '@material-ui/core/styles'
import {
  Button, ClickAwayListener,
  TableCell, TableRow, Typography,
} from '@material-ui/core'
import ButtonGroup from 'core/common/ButtonGroup'
import EnterTextField from 'core/common/EnterTextField'

const styles = {}

const stopPropagation = e => e.stopPropagation()

const TimeButton = ({ children, onTimeChange, step, unit, ...props }) => {
  const handleClick = e => {
    e.stopPropagation()
    onTimeChange(step, unit)
  }
  return (
    <Button variant="contained" onClick={handleClick}>{children}</Button>
  )
}

class EditActionRow extends React.Component {
  state = {
    ...this.props.action,
    title: this.props.action.title,
    due: this.props.action.due,
  }

  isDirty = () => !whereEq(this.state, this.props.action)

  setField = key => value => {
    this.setState({ [key]: value })
  }

  handleClose = () => {
    const { onClose, onUpdate } = this.props
    const newData = omit(['dirty'], this.state)
    this.isDirty() && onUpdate(newData)
    onClose()
  }

  handleTimeChange = (step, unit) => {
    this.setState({
      due: moment(this.state.due).add(step, unit).valueOf()
    })
  }

  render () {
    const { colSpan, action, onDelete } = this.props
    const { due, title } = this.state
    return (
      <ClickAwayListener key={action.id} onClickAway={this.handleClose}>
        <TableRow hover onClick={this.handleClose}>
          <TableCell>
            <IconButton Icon={Delete} onClick={onDelete}>Delete</IconButton>
          </TableCell>
          <TableCell>
            <EnterTextField
              label="title"
              value={title}
              onChange={this.setField('title')}
              onClick={stopPropagation}
              onEnter={this.handleClose}
              fullWidth autoFocus
            />
          </TableCell>
          <TableCell>
            <Typography variant="body1">{moment(due).format('MM/DD HH:MM')} ({moment(due).fromNow()})</Typography>
            <div>
              <ButtonGroup>
                <TimeButton step={-1} unit="w" onTimeChange={this.handleTimeChange}>-1 w</TimeButton>
                <TimeButton step={-1} unit="d" onTimeChange={this.handleTimeChange}>-1 d</TimeButton>
                <TimeButton step={-1} unit="h" onTimeChange={this.handleTimeChange}>-1 h</TimeButton>
              </ButtonGroup>
              <ButtonGroup>
                <TimeButton step={+1} unit="w" onTimeChange={this.handleTimeChange}>+1 w</TimeButton>
                <TimeButton step={+1} unit="d" onTimeChange={this.handleTimeChange}>+1 d</TimeButton>
                <TimeButton step={+1} unit="h" onTimeChange={this.handleTimeChange}>+1 h</TimeButton>
              </ButtonGroup>
            </div>
          </TableCell>
          <TableCell colSpan={colSpan - 3}>
            {/* */}
          </TableCell>
        </TableRow>
      </ClickAwayListener>
    )
  }
}

EditActionRow.propTypes = {
  action: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  colSpan: PropTypes.number.isRequired,
}

export default withStyles(styles)(EditActionRow)
