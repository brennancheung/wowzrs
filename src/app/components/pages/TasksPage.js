import React from 'react'
import Section from 'core/common/Section'
import { Button, Grid, List } from '@material-ui/core'
import { createTimeJournal } from '../time/actions'
import { sortAsc } from 'core/fp'
import { withFSQuery } from 'core/FSQuery'
import AddTask from '../tasks/AddTask'
import TaskRow from '../tasks/TaskRow'

class TasksPage extends React.Component {
  state = {
    task1: null,
    task2: null,
    task3: null,
    showArchived: false,
  }

  handleArchive = task => () => {
    this.props.fsRef.doc(task.id).update({ archived: true })
  }

  handleDelete = task => () => {
    this.props.fsRef.doc(task.id).delete()
  }

  handleSelectTask = (whichList, taskId) => () => {
    this.setState({ [whichList]: taskId })
    if (whichList === 'task1') {
      this.setState({ task2: null, task3: null })
    }
  }

  handleTimeTrack = task => () => {
    const { context } = this.props
    createTimeJournal({ context, task })
  }

  handleToggle = task => () => {
    const docRef = this.props.fsRef.doc(task.id)
    docRef.update({ done: !task.done })
  }

  showArchived = () => this.setState({ showArchived: !this.state.showArchived })

  render () {
    const { showArchived, task1, task2, task3 } = this.state
    const { data } = this.props
    const tasks = sortAsc('created', data).filter(x => showArchived || !x.archived)
    const list1 = tasks.filter(x => x.parentId === null)
    const list2 = tasks.filter(x => task1 && x.parentId === task1)
    const list3 = tasks.filter(x => task2 && x.parentId === task2)
    return (
      <Section title="tasks">
        <Button onClick={this.showArchived}>Show Archived</Button>
        <Grid container spacing={40}>
          <Grid item xs={4}>
            <AddTask />
            <List component="nav">
              {list1.map(task =>
                <TaskRow
                  key={task.id}
                  tasks={tasks}
                  task={task}
                  active={task.id === task1}
                  onArchive={this.handleArchive(task)}
                  onClick={this.handleSelectTask('task1', task.id)}
                  onDelete={this.handleDelete(task)}
                  onTimeTrack={this.handleTimeTrack(task)}
                  onToggle={this.handleToggle(task)}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={4}>
            <AddTask parent={task1} />
            <List component="nav">
              {list2.map(task =>
                <TaskRow
                  key={task.id}
                  task={task}
                  tasks={tasks}
                  active={task.id === task2}
                  onArchive={this.handleArchive(task)}
                  onClick={this.handleSelectTask('task2', task.id)}
                  onDelete={this.handleDelete(task)}
                  onTimeTrack={this.handleTimeTrack(task)}
                  onToggle={this.handleToggle(task)}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={4}>
            <AddTask parent={task2} />
            <List component="nav">
              {list3.map(task =>
                <TaskRow
                  key={task.id}
                  task={task}
                  tasks={tasks}
                  active={task.id === task3}
                  onArchive={this.handleArchive(task)}
                  onClick={this.handleSelectTask('task3', task.id)}
                  onDelete={this.handleDelete(task)}
                  onTimeTrack={this.handleTimeTrack(task)}
                  onToggle={this.handleToggle(task)}
                />
              )}
            </List>
          </Grid>
        </Grid>
        {false && <pre>{JSON.stringify(data, null, 4)}</pre>}
      </Section>
    )
  }
}

export default withFSQuery({
  path: '/users/$userId/tasks',
})(TasksPage)
