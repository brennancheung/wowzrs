import React from 'react'
import moment from 'moment'
import EnterTextField from 'core/common/EnterTextField'
import { withFSRef } from 'core/FSQuery'
import Section from 'core/common/Section'
import { Grid, Typography } from '@material-ui/core'
import ButtonGroup from 'core/common/ButtonGroup'
import TimeButton from 'core/common/TimeButton'

class AddWeight extends React.Component {
  state = { date: moment().startOf('day').valueOf() }

  createWeight = weight => {
    const data = {
      date: this.state.date,
      weight: Number(weight),
    }
    console.log(data)
    this.props.fsRef.add(data)
  }

  handleTimeChange = (step, unit) => {
    this.setState({
      date: moment(this.state.date).add(step, unit).valueOf()
    })
  }

  render () {
    const { date } = this.state
    return (
      <Section>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <EnterTextField
              label="new weight"
              onEnter={this.createWeight}
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={8}>
            <Typography variant="body1">{moment(date).format('MM/DD HH:MM')} ({moment(date).fromNow()})</Typography>
            <div>
              <ButtonGroup>
                <TimeButton step={-1} unit="d" onTimeChange={this.handleTimeChange}>-1 d</TimeButton>
                <TimeButton step={+1} unit="d" onTimeChange={this.handleTimeChange}>+1 d</TimeButton>
              </ButtonGroup>
            </div>
          </Grid>
        </Grid>
      </Section>
    )
  }
}

export default withFSRef('/users/$userId/weights')(AddWeight)
