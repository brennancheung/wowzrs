import React from 'react'
import moment from 'moment'
import FSQuery from 'core/FSQuery'
import Checkbox from 'core/common/Checkbox'
import ListTable from 'core/common/ListTable'
import Section from 'core/common/Section'
import ButtonGroup from 'core/common/ButtonGroup'
import ArchiveIcon from '@material-ui/icons/Archive'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import IconButton from 'core/common/IconButton'
import {
  TableCell,
  TableRow,
} from '@material-ui/core'

class GoalsForToday extends React.Component {
  state = {
    editing: null // id of goal currently being edited
  }

  render () {
    return (
      <FSQuery path="/users/$userId/goals" where={['archived', '==', false]}>
        {({ data, ref }) => {
          const columns = [
            { id: 'done', label: 'Completed?' },
            { id: 'title', label: 'Title' },
            { id: 'due', label: 'Due on' },
            { id: 'created', label: 'Created' },
            { id: 'completed', label: 'Completed' },
          ]

          const activeData = data.filter(x => !x.archived)
          const active = data.filter(x => !x.done)
          const done = activeData.filter(x => x.done)

          const sortedData = [
            ...active.sort((a, b) => {
              if (a.due === b.due) {
                return a.created > b.created ? -1 : 1
              }
              return a.due > b.due ? -1 : 1
            }),
            ...done.sort((a, b) => a.completed > b.completed ? -1 : 1),
          ]

          const handleToggle = id => state => {
            ref.doc(id).update({
              done: state,
              completed: state ? moment().valueOf() : null,
            })
          }

          const toggleEdit = id => e => {
            this.setState({ editing: this.state.editing ? null : id })
          }

          const handleArchive = () => {
            const startOfToday = moment().startOf('day').valueOf()
            const oldDone = activeData.filter(x => x.done && x.completed < startOfToday)
            oldDone.forEach(x => ref.doc(x.id).update({ archived: true }))
          }

          const handleMigrate = () => {
            data.forEach(x => !x.archived && ref.doc(x.id).update({ archived: false }))
          }

          const maybeStriked = (striked, children) => striked
            ? <span style={{ textDecoration: 'line-through', color: '#888' }}>{children}</span>
            : children

          const renderRow = goal => {
            if (this.state.editing === goal.id) {
              return (
                <TableRow key={goal.id} hover onClick={toggleEdit(goal.id)}>
                  <TableCell colSpan={columns.length}>
                    <h1>Edit the goal</h1>
                  </TableCell>
                </TableRow>
              )
            }
            return (
              <TableRow key={goal.id} hover onClick={toggleEdit(goal.id)}>
                <TableCell><Checkbox checked={goal.done} onChange={handleToggle(goal.id)} /></TableCell>
                <TableCell>{maybeStriked(goal.done, goal.title)}</TableCell>
                <TableCell>{!goal.completed && moment(goal.due).fromNow()}</TableCell>
                <TableCell>{moment(goal.created).fromNow()}</TableCell>
                <TableCell>{goal.completed && moment(goal.completed).fromNow()}</TableCell>
              </TableRow>
            )
          }

          return (
            <Section title="Goals for today">
              <ButtonGroup>
                <IconButton Icon={ArchiveIcon} onClick={handleArchive}>archive old completed</IconButton>
                <IconButton Icon={ChangeHistoryIcon} onClick={handleMigrate}>migrate</IconButton>
              </ButtonGroup>
              <ListTable columns={columns} data={sortedData} renderRow={renderRow} />
            </Section>
          )
        }}
      </FSQuery>
    )
  }
}

export default GoalsForToday
