import React from 'react'
import Checkbox from 'core/common/Checkbox'
import Section from 'core/common/Section'
import { withCollection } from 'core/firebase-helpers'
import { compose } from 'ramda'

const GoalsForToday = ({ data, context }) => {
  return (
    <Section title="Goals for today">
      <Checkbox checked>Checkbox component</Checkbox>
      <p>Filter out only for today</p>
      <p>Still show them even when completed</p>
    </Section>
  )
}

export default compose(
  withCollection('goals'),
)(GoalsForToday)
