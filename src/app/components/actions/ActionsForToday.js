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
import { path, partition, prop } from 'ramda'
import {
  TableCell,
  TableRow,
} from '@material-ui/core'
import EditActionRow from './EditActionRow'

const sortActions = actions => {
  const [ done, active ] = partition(prop('done'), actions)
  const doneSorted = done.sort((a, b) => a.completed > b.completed ? -1 : 1)
  const activeSorted = active.sort((a, b) =>
    a.due === b.due
      ? a.created > b.created ? -1 : 1
      : a.due < b.due ? -1 : 1
  )
  return [...activeSorted, ...doneSorted]
}

const columns = [
  { id: 'done', label: 'Done?' },
  { id: 'title', label: 'Title' },
  { id: 'due', label: 'Due' },
  { id: 'created', label: 'Created' },
  { id: 'completed', label: 'Completed' },
]

const maybeStriked = (striked, children) => striked
  ? <span style={{ textDecoration: 'line-through', color: '#888' }}>{children}</span>
  : children

class ActionsForToday extends React.Component {
  state = {
    editing: null // id of action currently being edited
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

  handleMigrate = async () => {
    const { context, data, db, fsRef } = this.props
    data.forEach(x => !x.archived && fsRef.doc(x.id).update({ archived: false }))
    const userId = path(['user', 'uid'], context)
    console.log(userId)
    if (!userId) { return }
    const goalsRef = db.collection(`/users/${userId}/goals`)
    const actionsRef = db.collection(`/users/${userId}/actions`)
    const goalsSnapshot = await goalsRef.get()
    goalsSnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data())
      actionsRef.doc(doc.id).set(doc.data())
    })
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

  renderEditAction = action => (
    <TableRow key={action.id} hover onClick={this.toggleEdit(action.id)}>
      <TableCell colSpan={columns.length}>
        <h1>Edit the action</h1>
      </TableCell>
    </TableRow>
  )

  renderActionRow = action => (
    <TableRow key={action.id} hover onClick={this.toggleEdit(action.id)}>
      <TableCell><Checkbox checked={action.done} onChange={this.handleToggle(action.id)} /></TableCell>
      <TableCell>{maybeStriked(action.done, action.title)}</TableCell>
      <TableCell>{!action.completed && moment(action.due).fromNow()}</TableCell>
      <TableCell>{moment(action.created).fromNow()}</TableCell>
      <TableCell>{action.completed && moment(action.completed).fromNow()}</TableCell>
    </TableRow>
  )

  renderRow = action => {
    if (this.state.editing === action.id) {
      return (
        <EditActionRow
          key={action.id}
          action={action}
          colSpan={columns.length}
          onClose={this.toggleEdit(action.id)}
          onUpdate={this.handleUpdate(action.id)}
          onDelete={this.handleDelete(action.id)}
        />
      )
    }
    return this.renderActionRow(action)
  }

  render () {
    const onlyToday = this.props.data.filter(action => action.due <= moment().endOf('day').valueOf())
    const sorted = sortActions(onlyToday)

    return (
      <Section title="Actions for today">
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
  path: '/users/$userId/actions',
  where: ['archived', '==', false]
})(ActionsForToday)
