import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'core/common/Checkbox'
import Duration from 'core/common/Duration'
import EditActionRow from './EditActionRow'
import moment from 'moment'
import { TableCell, TableRow } from '@material-ui/core'
import { withFSRef } from 'core/FSQuery'

const maybeStriked = (striked, children) => striked
  ? <span style={{ textDecoration: 'line-through', color: '#888' }}>{children}</span>
  : children

class BaseActionRow extends React.Component {
  handleComplete = id => () => {
    this.handleToggle(id)(true)
    this.props.onToggleEdit()
  }

  handleDelete = id => () => {
    this.props.fsRef.doc(id).delete()
    this.props.onToggleEdit()
  }

  handleToggle = id => async done => {
    const docRef = this.props.fsRef.doc(id)
    docRef.update({
      done,
      completed: done ? moment().valueOf() : null,
    })
    if (done) {
      const snapshot = await docRef.get()
      const data = snapshot.data()
      if (data.started) {
        const now = moment().valueOf()
        const elapsed = now - data.started
        const duration = (data.duration || 0) + elapsed
        docRef.update({
          started: null,
          duration,
        })
      }
    }
  }

  handleUpdate = id => newData => {
    this.props.fsRef.doc(id).update(newData)
  }

  render () {
    const { action, columns, editing, onToggleEdit } = this.props

    if (editing) {
      return (
        <EditActionRow
          key={action.id}
          action={action}
          columns={columns}
          onClose={onToggleEdit}
          onComplete={this.handleComplete(action.id)}
          onUpdate={this.handleUpdate(action.id)}
          onDelete={this.handleDelete(action.id)}
        />
      )
    }

    const columnRenderers = {
      done: () => !action.archived && <Checkbox checked={action.done} onChange={this.handleToggle(action.id)} />,
      title: () => maybeStriked(action.done, action.title),
      due: () => !action.completed && moment(action.due).fromNow(),
      duration: () => action.duration && <Duration ms={action.duration} small />,
      created: () => moment(action.created).fromNow(),
      completed: () => action.completed && moment(action.completed).fromNow(),
    }

    return (
      <TableRow key={action.id} hover onClick={onToggleEdit}>
        {columns.map(c => <TableCell key={c.id}>{columnRenderers[c.id]()}</TableCell>)}
      </TableRow>
    )
  }
}

const ActionRow = withFSRef('/users/$userId/actions')(BaseActionRow)

ActionRow.propTypes = {
  onToggleEdit: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export const renderActionRow = columns => ({ row, ...props }) => (
  <ActionRow
    key={row.id}
    action={row}
    columns={columns}
    {...props}
  />
)

export default ActionRow
