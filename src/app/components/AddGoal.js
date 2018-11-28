import React from 'react'
import moment from 'moment'
import EnterTextField from 'core/common/EnterTextField'
import FSCollection from 'core/FSCollection'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 1,
  }
})

const AddGoal = ({ classes }) => (
  <FSCollection path="/users/$userId/goals">
    {({ collection }) => {
      const createGoal = async title => {
        const due = moment().endOf('day').valueOf()
        const created = moment().valueOf()
        const data = { title, created, due, done: false }
        await collection.add(data)
      }
      return (
        <Paper className={classes.paper}>
          <EnterTextField
            label="new goal"
            onEnter={createGoal}
            fullWidth
          />
        </Paper>
      )
    }}
  </FSCollection>
)

export default withStyles(styles)(AddGoal)
