import React from 'react'
import moment from 'moment'
import { getUserDoc } from 'core/FSDoc'
import { withFSQuery } from 'core/FSQuery'
import { Button, Card, CardActions, CardContent, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'ramda'
// import { sortAsc, sortDesc } from 'core/fp'

const styles = theme => ({
  margin: {
    marginTop: theme.spacing.unit * 2,
  },
})
class TimeTrackerWidget extends React.Component {
  state = {}

  componentDidMount () {
    const entry = this.getOpenEntry(this.props.data)
    this.updateDerived(entry)
  }

  componentDidUpdate (prevProps) {
    const oldEntry = this.getOpenEntry(prevProps.data)
    const newEntry = this.getOpenEntry(this.props.data)
    if (oldEntry !== newEntry) {
      this.updateDerived(newEntry)
    }
  }

  getOpenEntry = (entries) => {
    return entries[0]
  }

  updateDerived = async entry => {
    // Fetches the goal and task for the associated entry
    if (entry.goal) {
      const goal = await getUserDoc({ context, path: `/goals/${entry.goal}` })
      this.setState({ goal: goal.title })
    }
    if (entry.task) {
      const task = await getUserDoc({ context, path: `/tasks/${entry.task}` })
      this.setState({ task: task.title })
    }
  }

  render () {
    const entry = this.getOpenEntry(this.props.data)
    const { start } = entry
    const elapsed = (moment().valueOf() - start) / 1000
    const { goal, task } = this.state
    return (
      <Paper elevation={24} className={this.props.classes.margin}>
        <Card>
          <CardContent>
            <Typography variant="caption">Currently focused on</Typography>
            <Typography variant="h6">{task}</Typography>
            <Typography varient="subtitle1">{goal}</Typography>

            <br />
            <Typography variant="caption">Elapsed</Typography>
            Seconds elapsed: { elapsed }

            <pre>{JSON.stringify(entry, null, 4)}</pre>
          </CardContent>
          <CardActions>
            <Button size="small">start</Button>
            <Button size="small">stop</Button>
          </CardActions>
        </Card>
      </Paper>
    )
  }
}

export default compose(
  withStyles(styles),
  withFSQuery({ path: '/users/$userId/timeJournal', where: [ 'completed', '==', false ] }),
)(TimeTrackerWidget)
