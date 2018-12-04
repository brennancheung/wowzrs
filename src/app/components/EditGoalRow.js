import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { __, eqProps, omit, whereEq } from 'ramda'
import { Delete } from '@material-ui/icons'
import IconButton from 'core/common/IconButton'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  TableCell,
  TableRow,
  Typography,
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

class EditGoalRow extends React.Component {
  state = {
    ...this.props.goal,
    title: this.props.goal.title,
    due: this.props.goal.due,
  }

  isDirty = () => !whereEq(this.state, this.props.goal)

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
    const { colSpan, goal, onDelete } = this.props
    const { due, title } = this.state
    return (
      <TableRow key={goal.id} hover onClick={this.handleClose}>
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
          Buttons here
          <pre>{JSON.stringify(goal, null, 4)}</pre>
        </TableCell>
      </TableRow>
    )
  }
}

EditGoalRow.propTypes = {
  goal: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  colSpan: PropTypes.number.isRequired,
}

export default withStyles(styles)(EditGoalRow)
