import React from 'react'
import moment from 'moment'
import AddGoal from './AddGoal'
import Checkbox from 'core/common/Checkbox'
import Section from 'core/common/Section'
import FSQuery from 'core/FSQuery'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const Goal = ({ goal, onClick }) => {
  return (
    <TableRow onClick={onClick}>
      <TableCell>
        <Checkbox checked={goal.done} />
      </TableCell>
      <TableCell>{goal.title}</TableCell>
      <TableCell>{moment(goal.due).fromNow()}</TableCell>
      <TableCell>{moment(goal.created).fromNow()}</TableCell>
    </TableRow>
  )
}

const GoalsForToday = () => (
  <FSQuery path="/users/$userId/goals">
    {({ data }) => {
      return (
        <Section title="Goals for today">
          <AddGoal />
          <br />
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Completed?</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Due on</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(goal => <Goal key={goal.id} goal={goal} />)}
              </TableBody>
            </Table>
          </Paper>
        </Section>
      )
    }}
  </FSQuery>
)

export default GoalsForToday
