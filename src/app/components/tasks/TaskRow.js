import React from 'react'
import Checkbox from 'core/common/Checkbox'
import MoreMenu from 'core/common/MoreMenu'
import { ListItem, ListItemText } from '@material-ui/core'

const maybeStriked = (striked, children) => striked
  ? <span style={{ textDecoration: 'line-through', color: '#888' }}>{children}</span>
  : children

const TaskRow = props => {
  const {
    active, task, tasks,
    onArchive, onClick, onDelete, onTimeTrack, onToggle,
  } = props
  const childTasks = tasks.filter(x => x.parentId === task.id)
  const numChildren = childTasks.length
  const numDone = childTasks.filter(x => x.done).length
  const actions = [
    { label: 'archive', action: onArchive },
    { label: 'delete', action: onDelete },
    { label: 'track', action: onTimeTrack },
  ]
  return (
    <ListItem button dense selected={active} onClick={onClick}>
      <Checkbox
        checked={task.done}
        onChange={onToggle}
      />
      <ListItemText>
        {maybeStriked(task.done, task.title)}
      </ListItemText>
      {numChildren > 0 && <span>{numDone} / {numChildren}</span>}
      {active && <MoreMenu items={actions} />}
    </ListItem>
  )
}

export default TaskRow
