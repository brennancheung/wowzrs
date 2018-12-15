import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { omit, whereEq } from 'ramda'
import { Delete, Pause, PlayArrow, Stop } from '@material-ui/icons'
import IconButton from 'core/common/IconButton'
import { withStyles } from '@material-ui/core/styles'
import {
  ClickAwayListener,
  TableCell, TableRow, Typography,
} from '@material-ui/core'
import ButtonGroup from 'core/common/ButtonGroup'
import Duration from 'core/common/Duration'
import TimeButton from 'core/common/TimeButton'
import EnterTextField from 'core/common/EnterTextField'

const styles = {}

const stopPropagation = e => e.stopPropagation()

class EditActionRow extends React.Component {
  state = { ...this.props.action }

  componentDidMount () {
    if (this.state.started) {
      this.startTimer()
    }
  }

  isDirty = () => !whereEq(this.state, this.props.action) || this.state.elapsed

  setField = key => value => {
    this.setState({ [key]: value })
  }

  handleClose = () => {
    const { onClose } = this.props
    this.handleUpdate()
    onClose()
  }

  handleComplete = async () => {
    await this.handlePause()
    this.props.onComplete()
  }

  handleTimeChange = (step, unit) => {
    this.setState({
      due: moment(this.state.due).add(step, unit).valueOf()
    })
  }

  handleStart = () => {
    this.setState({ started: moment().valueOf() }, () => {
      this.handleTick()
      this.handleUpdate()
    })
    this.startTimer()
  }

  handlePause = () => {
    return new Promise(resolve => {
      const { elapsed, duration } = this.state
      clearInterval(this.timerId)
      this.timerId = null
      const newDuration = (duration || 0) + (elapsed || 0)
      this.setState(
        { started: null, elapsed: null, duration: newDuration },
        () => {
          this.handleUpdate()
          resolve()
        }
      )
    })
  }

  handleTick = () => {
    const elapsed = this.calcElapsed()
    this.setState({ elapsed })
  }

  handleUpdate = () => {
    if (!this.isDirty()) { return }
    const { onUpdate } = this.props
    const fieldsToRemove = ['dirty', 'elapsed']
    const data = omit(fieldsToRemove, this.state)
    onUpdate(data)
  }

  calcElapsed = () => {
    const now = moment().valueOf()
    return now - this.state.started
  }

  calcDuration = () => {
    const { elapsed=0, duration=0 } = this.state
    return duration + elapsed
  }

  startTimer = () => {
    this.timerId = setInterval(this.handleTick, 1000)
    this.handleTick()
  }

  componentWillUnmount () {
    this.timerId && clearInterval(this.timerId)
  }

  renderDuration = () => {
    const duration = this.calcDuration()
    if (duration === 0) { return null }
    return (
      <Duration ms={duration} />
    )
  }

  renderStart = () => this.timerId
    ? null
    : <IconButton Icon={PlayArrow} onClick={this.handleStart} stopPropagation>Start</IconButton>

  renderPause = () => this.timerId
    ? <IconButton Icon={Pause} onClick={this.handlePause} stopPropagation>Pause</IconButton>
    : null

  render () {
    const { action, columns, onDelete } = this.props
    const { due, title } = this.state

    const columnRenderers = {
      done: () => (
        <div>
          <IconButton Icon={Delete} onClick={onDelete}>Delete</IconButton>
          <br />
          <br />
          <IconButton Icon={Stop} onClick={this.handleComplete} stopPropagation>Complete</IconButton>
        </div>
      ),
      title: () => (
        <EnterTextField
          label="title"
          value={title}
          onChange={this.setField('title')}
          onClick={stopPropagation}
          onEnter={this.handleClose}
          fullWidth autoFocus
        />
      ),
      due: () => (
        <React.Fragment>
          <Typography variant="body1">{moment(due).format('MM/DD HH:MM')} ({moment(due).fromNow()})</Typography>
          <div>
            <ButtonGroup>
              <TimeButton step={+1} unit="w" onTimeChange={this.handleTimeChange}>+1 w</TimeButton>
              <TimeButton step={+1} unit="d" onTimeChange={this.handleTimeChange}>+1 d</TimeButton>
              <TimeButton step={+1} unit="h" onTimeChange={this.handleTimeChange}>+1 h</TimeButton>
            </ButtonGroup>
            <ButtonGroup>
              <TimeButton step={-1} unit="w" onTimeChange={this.handleTimeChange}>-1 w</TimeButton>
              <TimeButton step={-1} unit="d" onTimeChange={this.handleTimeChange}>-1 d</TimeButton>
              <TimeButton step={-1} unit="h" onTimeChange={this.handleTimeChange}>-1 h</TimeButton>
            </ButtonGroup>
          </div>
        </React.Fragment>
      ),
      duration: () => (
        <div>
          {this.renderDuration()}
          {this.renderStart()}
          {this.renderPause()}
        </div>
      ),
      created: () => moment(action.created).fromNow(),
      completed: () => action.completed && moment(action.completed).fromNow(),
      debug: () => <pre>{JSON.stringify(this.state, null, 4)}</pre>,
    }
    return (
      <ClickAwayListener key={action.id} onClickAway={this.handleClose}>
        <TableRow hover onClick={this.handleClose}>
          {columns.map(c => <TableCell key={c.id}>{columnRenderers[c.id]()}</TableCell>)}
        </TableRow>
      </ClickAwayListener>
    )
  }
}

EditActionRow.propTypes = {
  action: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditActionRow)
