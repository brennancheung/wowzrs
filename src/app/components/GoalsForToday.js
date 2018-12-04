import React from 'react'
import moment from 'moment'
import { withFSQuery } from 'core/FSQuery'
import Checkbox from 'core/common/Checkbox'
import ListTable from 'core/common/ListTable'
import Section from 'core/common/Section'
import ButtonGroup from 'core/common/ButtonGroup'
import ArchiveIcon from '@material-ui/icons/Archive'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import IconButton from 'core/common/IconButton'
import { partition, prop } from 'ramda'
import {
  TableCell,
  TableRow,
} from '@material-ui/core'
import EditGoalRow from './EditGoalRow'

const sortGoals = goals => {
  const [ done, active ] = partition(prop('done'), goals)
  const doneSorted = done.sort((a, b) => a.completed > b.completed ? -1 : 1)
  const activeSorted = active.sort((a, b) =>
    a.due === b.due
      ? a.created > b.created ? -1 : 1
      : a.due < b.due ? -1 : 1
  )
  return [...activeSorted, ...doneSorted]
}

const columns = [
  { id: 'done', label: 'Completed?' },
  { id: 'title', label: 'Title' },
  { id: 'due', label: 'Due on' },
  { id: 'created', label: 'Created' },
  { id: 'completed', label: 'Completed' },
]

const maybeStriked = (striked, children) => striked
  ? <span style={{ textDecoration: 'line-through', color: '#888' }}>{children}</span>
  : children

class GoalsForToday extends React.Component {
  state = {
    editing: null // id of goal currently being edited
  }

  toggleEdit = id => e => {
    this.setState({ editing: this.state.editing ? null : id })
  }

  handleArchive = () => {
    const { fsRef, data } = this.props
    const startOfToday = moment().startOf('day').valueOf()
    const oldDone = data.filter(x => x.done && x.completed < startOfToday)
    oldDone.forEach(x => fsRef.doc(x.id).update({ archived: true }))
  }

  handleDelete = id => () => {
    this.props.fsRef.doc(id).delete()
    this.setState({ editing: null })
  }

  handleMigrate = () => {
    const { data, fsRef } = this.props
    data.forEach(x => !x.archived && fsRef.doc(x.id).update({ archived: false }))
  }

  handleToggle = id => state => {
    this.props.fsRef.doc(id).update({
      done: state,
      completed: state ? moment().valueOf() : null,
    })
  }

  handleUpdate = id => newData => {
    this.props.fsRef.doc(id).update(newData)
  }

  renderEditGoal = goal => (
    <TableRow key={goal.id} hover onClick={this.toggleEdit(goal.id)}>
      <TableCell colSpan={columns.length}>
        <h1>Edit the goal</h1>
      </TableCell>
    </TableRow>
  )

  renderGoalRow = goal => (
    <TableRow key={goal.id} hover onClick={this.toggleEdit(goal.id)}>
      <TableCell><Checkbox checked={goal.done} onChange={this.handleToggle(goal.id)} /></TableCell>
      <TableCell>{maybeStriked(goal.done, goal.title)}</TableCell>
      <TableCell>{!goal.completed && moment(goal.due).fromNow()}</TableCell>
      <TableCell>{moment(goal.created).fromNow()}</TableCell>
      <TableCell>{goal.completed && moment(goal.completed).fromNow()}</TableCell>
    </TableRow>
  )

  renderRow = goal => {
    if (this.state.editing === goal.id) {
      return (
        <EditGoalRow
          key={goal.id}
          goal={goal}
          colSpan={columns.length}
          onClose={this.toggleEdit(goal.id)}
          onUpdate={this.handleUpdate(goal.id)}
          onDelete={this.handleDelete(goal.id)}
        />
      )
    }
    return this.renderGoalRow(goal)
  }

  render () {
    const onlyToday = this.props.data.filter(goal => goal.due <= moment().endOf('day').valueOf())
    const sorted = sortGoals(onlyToday)

    return (
      <Section title="Goals for today">
        <ButtonGroup>
          <IconButton Icon={ArchiveIcon} onClick={this.handleArchive}>archive old completed</IconButton>
          <IconButton Icon={ChangeHistoryIcon} onClick={this.handleMigrate}>migrate</IconButton>
        </ButtonGroup>
        <ListTable columns={columns} data={sorted} renderRow={this.renderRow} />
      </Section>
    )
  }
}

export default withFSQuery({
  path: '/users/$userId/goals',
  where: ['archived', '==', false]
})(GoalsForToday)
