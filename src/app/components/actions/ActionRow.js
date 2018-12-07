import React from 'react'
import Checkbox from 'core/common/Checkbox'
import EditActionRow from './EditActionRow'
import moment from 'moment'
import { TableCell, TableRow } from '@material-ui/core'

const maybeStriked = (striked, children) => striked
  ? <span style={{ textDecoration: 'line-through', color: '#888' }}>{children}</span>
  : children

class ActionRow extends React.Component {
  state = { editing: false }

  toggleEdit = () => {
    this.setState(state => ({ editing: !state.editing }))
  }

  handleDelete = id => () => {
    this.props.fsRef.doc(id).delete()
    this.setState({ editing: null })
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

  render () {
    const { columns, action } = this.props

    if (this.state.editing) {
      return (
        <EditActionRow
          key={action.id}
          action={action}
          colSpan={columns.length}
          onClose={this.toggleEdit}
          onUpdate={this.handleUpdate(action.id)}
          onDelete={this.handleDelete(action.id)}
        />
      )
    }

    return (
      <TableRow key={action.id} hover onClick={this.toggleEdit}>
        <TableCell>
          {!action.archived && <Checkbox checked={action.done} onChange={this.handleToggle(action.id)} />}
        </TableCell>
        <TableCell>{maybeStriked(action.done, action.title)}</TableCell>
        <TableCell>{!action.completed && moment(action.due).fromNow()}</TableCell>
        <TableCell>{moment(action.created).fromNow()}</TableCell>
        <TableCell>{action.completed && moment(action.completed).fromNow()}</TableCell>
      </TableRow>
    )
  }
}

export default ActionRow
